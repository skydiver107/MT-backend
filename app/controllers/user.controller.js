const db = require("../models");
const User = db.user;
const Role = db.role;
const {
  selectStatement,
  whereStatement,
  pageStatement,
  queryBuilder,
} = require("../config/query.config");

const Op = db.Sequelize.Op;

exports.getUsers = async (req, res) => {
  const username = req.query.username;
  const role = req.query.role;
  const perPage = req.query.perPage;
  const currentPage = req.query.currentPage;
  // var userCondition = username ? { username: { [Op.iLike]: `%${username}%` } } : null
  // var roleCondition = (role && role != 0) ? { id: role } : null

  var userSelect = [
    "users.ID",
    "users.username",
    "users.email",
    "users.nbblAmount",
    "users.dbblAmount",
    'userRoles."roleId"',
    'roles."name" AS roleName',
  ];

  var userWhere = [
    {
      val1: 'userRoles."roleId"',
      val2: 'roles."id"',
    },
  ];

  if (!!role && role != 0) {
    userWhere.push({
      val1: 'userRoles."roleId"',
      val2: role,
    });
  }

  if (!!username) {
    userWhere.push({
      val1: "users.username",
      val2: `'%` + username + `%'`,
      opt: "LIKE",
    });
  }

  var userQuery = queryBuilder(
    selectStatement(userSelect),
    'FROM users LEFT JOIN userRoles ON users."id" = userRoles."userId", roles',
    whereStatement(userWhere),
    'ORDER BY users."id" ASC',
    pageStatement(perPage, currentPage)
  );

  const [results, metadata] = await db.sequelize.query(userQuery);

  if (!!perPage) {
    const totalUserQuery = queryBuilder(
      selectStatement(userSelect),
      'FROM users LEFT JOIN userRoles ON users."id" = userRoles."userId", roles',
      whereStatement(userWhere),
      'ORDER BY users."id" ASC',
      ""
    );

    const [totalUsers, metadata] = await db.sequelize.query(totalUserQuery);
    const totalCount = totalUsers.length;
    const totalPage = Math.ceil(totalCount / perPage);

    return res.status(200).send({
      data: results,
      totalPage: totalPage,
      totalCount: totalCount,
      success: true,
    });
  }

  return res.status(200).send({
    data: results,
    totalPage: 1,
    totalCount: results.length,
    success: true,
  });
};

exports.addUser = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const role = req.body.role;

  if (
    username == undefined ||
    username == null ||
    username == "" ||
    email == undefined ||
    email == null ||
    email == "" ||
    role == undefined ||
    role == null ||
    role <= 0
  ) {
    return res
      .status(500)
      .send({ success: false, message: "Please provide correct information." });
  }

  var userCondition = email ? { email: email } : null;

  const userCount = await User.count({
    where: userCondition,
  });

  if (userCount > 0)
    return res.status(200).send({
      success: false,
      message: "This email address has already registered.",
    });

  const newUser = await User.create({
    username: username,
    email: email,
    accountType: 1,
  });

  const roles = await Role.findAll({
    where: {
      id: role,
    },
  });

  const result = newUser.setRoles(roles);

  if (result)
    return res.status(200).send({
      message: "New user is successfully created.",
      success: true,
    });
  else
    return res.status(500).send({
      message: "Cannot create a user.",
      success: false,
    });
};

exports.updateUser = async (req, res) => {
  const id = req.params.id;

  if (id == undefined || id == null || id <= 0) {
    return res.status(500).send({
      success: false,
      message: "Please provide correct information to update data.",
    });
  }

  const result = await User.update(req.body, {
    where: { id: id },
  });

  if (req.body.role) {
    const user = await User.findOne({ where: { id: id } });

    user.setRoles(req.body.role);
  }

  if (result) {
    return res.status(200).send({
      message: "User updated successfully.",
      success: true,
    });
  } else {
    return res.status(500).send({
      message: `Cannot update user with id=${id}.`,
      success: false,
    });
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;

  if (id == undefined || id == null || id <= 0) {
    return res
      .status(500)
      .send({ success: false, message: "Failed deleting user." });
  }

  const result = await User.destroy({
    where: { id: id },
  });

  if (result) {
    return res.status(200).send({
      message: "User was deleted successfully.",
      success: true,
    });
  } else {
    return res.status(500).send({
      message: `Cannot delete user with id=${id}.`,
      success: false,
    });
  }
};

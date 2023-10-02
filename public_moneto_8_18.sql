/*
 Navicat Premium Data Transfer

 Source Server         : NBBL
 Source Server Type    : PostgreSQL
 Source Server Version : 140007 (140007)
 Source Host           : localhost:5432
 Source Catalog        : NBBL
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 140007 (140007)
 File Encoding         : 65001

 Date: 18/08/2023 07:45:46
*/


-- ----------------------------
-- Sequence structure for accessTokens_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."accessTokens_id_seq";
CREATE SEQUENCE "public"."accessTokens_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for addresses_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."addresses_id_seq";
CREATE SEQUENCE "public"."addresses_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for balanceHistories_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."balanceHistories_id_seq";
CREATE SEQUENCE "public"."balanceHistories_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for cakepayments_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."cakepayments_id_seq";
CREATE SEQUENCE "public"."cakepayments_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for notifications_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."notifications_id_seq";
CREATE SEQUENCE "public"."notifications_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for plaids_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."plaids_id_seq";
CREATE SEQUENCE "public"."plaids_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for shippingAddresses_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."shippingAddresses_id_seq";
CREATE SEQUENCE "public"."shippingAddresses_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for stripes_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."stripes_id_seq";
CREATE SEQUENCE "public"."stripes_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for transactions_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."transactions_id_seq";
CREATE SEQUENCE "public"."transactions_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for users_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."users_id_seq";
CREATE SEQUENCE "public"."users_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for accessTokens
-- ----------------------------
DROP TABLE IF EXISTS "public"."accessTokens";
CREATE TABLE "public"."accessTokens" (
  "id" int4 NOT NULL DEFAULT nextval('"accessTokens_id_seq"'::regclass),
  "userId" int4,
  "token" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL,
  "expiresAt" int8
)
;

-- ----------------------------
-- Records of accessTokens
-- ----------------------------
INSERT INTO "public"."accessTokens" VALUES (2276, 55, 'vMIRMJ1Yjp8DpYGx0g0A2Go8RMMv2dv9vmHcInQsdKo.KVBo7SeKS4HorDt27vxnNWzGF9JchJI3Xu2HIEB7FAs', '2023-08-18 04:43:39.723-07', '2023-08-18 04:43:39.723-07', 1692362616);

-- ----------------------------
-- Table structure for addresses
-- ----------------------------
DROP TABLE IF EXISTS "public"."addresses";
CREATE TABLE "public"."addresses" (
  "id" int4 NOT NULL DEFAULT nextval('addresses_id_seq'::regclass),
  "userId" varchar(255) COLLATE "pg_catalog"."default",
  "address1" varchar(255) COLLATE "pg_catalog"."default",
  "address2" varchar(255) COLLATE "pg_catalog"."default",
  "address3" varchar(255) COLLATE "pg_catalog"."default",
  "city" varchar(255) COLLATE "pg_catalog"."default",
  "state" varchar(255) COLLATE "pg_catalog"."default",
  "country" varchar(255) COLLATE "pg_catalog"."default",
  "postalCode" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;

-- ----------------------------
-- Records of addresses
-- ----------------------------

-- ----------------------------
-- Table structure for balanceHistories
-- ----------------------------
DROP TABLE IF EXISTS "public"."balanceHistories";
CREATE TABLE "public"."balanceHistories" (
  "id" int4 NOT NULL DEFAULT nextval('"balanceHistories_id_seq"'::regclass),
  "userId" int4,
  "actionType" int4,
  "amount" float8 DEFAULT '0'::double precision,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL,
  "itemId" varchar(255) COLLATE "pg_catalog"."default",
  "paymentMethod" varchar(255) COLLATE "pg_catalog"."default",
  "cardId" varchar(255) COLLATE "pg_catalog"."default",
  "customerId" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of balanceHistories
-- ----------------------------
INSERT INTO "public"."balanceHistories" VALUES (44, 55, 1, 100, '2023-07-27 05:45:16.37-07', '2023-07-27 05:45:16.37-07', NULL, 'stripe', 'card_1NYCqmBd7htbZCgWBcM89QYo', 'cus_OFH7BxHWx0T353');
INSERT INTO "public"."balanceHistories" VALUES (45, 55, 1, 50, '2023-07-27 05:45:45.47-07', '2023-07-27 05:45:45.47-07', NULL, 'stripe', 'card_1NYCqmBd7htbZCgWBcM89QYo', 'cus_OFH7BxHWx0T353');
INSERT INTO "public"."balanceHistories" VALUES (49, 55, 1, 50, '2023-07-31 06:19:12.229-07', '2023-07-31 06:19:12.229-07', 'pGBnJgoQkdSe3D7K16aJhqmwDMkoN5HLyvqvQ', 'plaid', NULL, 'cus_OFH7BxHWx0T353');
INSERT INTO "public"."balanceHistories" VALUES (50, 55, 1, 100, '2023-07-31 06:24:51.284-07', '2023-07-31 06:24:51.284-07', 'ynvGXRJDyms6GRAb1KbXuJMQkabBypcy7AXzq', 'plaid', NULL, 'cus_OFH7BxHWx0T353');
INSERT INTO "public"."balanceHistories" VALUES (51, 55, 1, 200, '2023-07-31 06:25:20.088-07', '2023-07-31 06:25:20.088-07', 'pGBnJgoQkdSe3D7K16aJhqmwDMkoN5HLyvqvQ', 'plaid', NULL, 'cus_OFH7BxHWx0T353');
INSERT INTO "public"."balanceHistories" VALUES (54, 55, 1, 50, '2023-07-31 07:05:47.219-07', '2023-07-31 07:05:47.219-07', 'BjPm8V451Gu3L3g5PopxINrbq5VQKEFwmGW7g', 'plaid', NULL, 'cus_OFH7BxHWx0T353');
INSERT INTO "public"."balanceHistories" VALUES (55, 55, 1, 242, '2023-08-11 19:40:29.442-07', '2023-08-11 19:40:29.442-07', NULL, 'stripe', 'card_1NSmbGBd7htbZCgWRtIhCOnY', 'cus_OFH7BxHWx0T353');
INSERT INTO "public"."balanceHistories" VALUES (56, 55, 1, 50, '2023-08-12 18:59:29.139-07', '2023-08-12 18:59:29.139-07', NULL, 'cakepayment', 'card_1NSmbGBd7htbZCgWRtIhCOnY', 'cus_OFH7BxHWx0T353');
INSERT INTO "public"."balanceHistories" VALUES (57, 55, 1, 50, '2023-08-12 19:25:01.951-07', '2023-08-12 19:25:01.951-07', NULL, 'cakepayment', 'card_1NSmbGBd7htbZCgWRtIhCOnY', 'cus_OFH7BxHWx0T353');
INSERT INTO "public"."balanceHistories" VALUES (58, 55, 1, 50, '2023-08-12 19:25:24.623-07', '2023-08-12 19:25:24.623-07', NULL, 'cakepayment', 'card_1NSmbGBd7htbZCgWRtIhCOnY', 'cus_OFH7BxHWx0T353');
INSERT INTO "public"."balanceHistories" VALUES (59, 53, 1, 50, '2023-08-15 19:08:44.012-07', '2023-08-15 19:08:44.012-07', NULL, 'stripe', 'card_1NV9I4Bd7htbZCgWWxI8EdIy', 'cus_OCDFHXJffRqvVm');
INSERT INTO "public"."balanceHistories" VALUES (60, 53, 1, 50, '2023-08-15 19:09:04.719-07', '2023-08-15 19:09:04.719-07', NULL, 'stripe', 'card_1NUwwcBd7htbZCgW46C5HcWL', 'cus_OCDFHXJffRqvVm');
INSERT INTO "public"."balanceHistories" VALUES (61, 53, 1, 100, '2023-08-15 22:30:21.38-07', '2023-08-15 22:30:21.38-07', NULL, 'stripe', 'card_1NUwwcBd7htbZCgW46C5HcWL', 'cus_OCDFHXJffRqvVm');
INSERT INTO "public"."balanceHistories" VALUES (62, 53, 1, 200, '2023-08-15 23:23:33.859-07', '2023-08-15 23:23:33.859-07', NULL, 'stripe', 'card_1NUwwcBd7htbZCgW46C5HcWL', 'cus_OCDFHXJffRqvVm');

-- ----------------------------
-- Table structure for cakepayments
-- ----------------------------
DROP TABLE IF EXISTS "public"."cakepayments";
CREATE TABLE "public"."cakepayments" (
  "id" int4 NOT NULL DEFAULT nextval('cakepayments_id_seq'::regclass),
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "orderId" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;

-- ----------------------------
-- Records of cakepayments
-- ----------------------------
INSERT INTO "public"."cakepayments" VALUES (3, 'rlalimurung@gmail.com', 'mtc_uwvCGD7FGdfk', '2023-08-15 17:57:23.412-07', '2023-08-15 17:57:23.412-07');
INSERT INTO "public"."cakepayments" VALUES (4, 'freeskydiver1007@gmail.com', 'mtc_HrqKrN3RgZMI', '2023-08-16 09:58:47.536-07', '2023-08-16 09:58:47.536-07');

-- ----------------------------
-- Table structure for notifications
-- ----------------------------
DROP TABLE IF EXISTS "public"."notifications";
CREATE TABLE "public"."notifications" (
  "id" int4 NOT NULL DEFAULT nextval('notifications_id_seq'::regclass),
  "userId" varchar(255) COLLATE "pg_catalog"."default",
  "notification" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;

-- ----------------------------
-- Records of notifications
-- ----------------------------
INSERT INTO "public"."notifications" VALUES (1, '53', 'You have notification', '2023-07-18 09:05:29-07', '2023-07-18 09:05:33-07');
INSERT INTO "public"."notifications" VALUES (2, '53', 'Second Notification', '2023-07-17 09:28:52-07', '2023-07-17 09:28:57-07');
INSERT INTO "public"."notifications" VALUES (3, '53', 'Third Notification', '2023-07-19 09:29:56-07', '2023-07-19 09:30:00-07');
INSERT INTO "public"."notifications" VALUES (4, '55', 'Al Nassr Al Hilal AL shabav Al Towen', '2023-06-07 21:02:04-07', '2023-07-12 21:02:09-07');

-- ----------------------------
-- Table structure for plaids
-- ----------------------------
DROP TABLE IF EXISTS "public"."plaids";
CREATE TABLE "public"."plaids" (
  "id" int4 NOT NULL DEFAULT nextval('plaids_id_seq'::regclass),
  "userId" varchar(255) COLLATE "pg_catalog"."default",
  "accessToken" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL,
  "itemId" varchar(255) COLLATE "pg_catalog"."default",
  "institutionId" varchar(255) COLLATE "pg_catalog"."default",
  "institutionName" varchar(255) COLLATE "pg_catalog"."default",
  "accountName" varchar(255) COLLATE "pg_catalog"."default",
  "accountType" varchar(255) COLLATE "pg_catalog"."default",
  "accountSubtype" varchar(255) COLLATE "pg_catalog"."default",
  "last4" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of plaids
-- ----------------------------
INSERT INTO "public"."plaids" VALUES (15, '55', 'access-sandbox-f0fab312-8b50-42d3-8601-ecb5ba774a97', '2023-07-31 06:18:49.8-07', '2023-07-31 06:18:49.8-07', 'pGBnJgoQkdSe3D7K16aJhqmwDMkoN5HLyvqvQ', 'ins_127989', 'Bank of America', 'Plaid Checking', 'depository', 'checking', '0000');
INSERT INTO "public"."plaids" VALUES (16, '55', 'access-sandbox-064613fc-75f3-4f62-bafe-4a2b9d2c5bb6', '2023-07-31 06:24:39.353-07', '2023-07-31 06:24:39.353-07', 'ynvGXRJDyms6GRAb1KbXuJMQkabBypcy7AXzq', 'ins_127991', 'Wells Fargo', 'Plaid Checking', 'depository', 'checking', '0000');
INSERT INTO "public"."plaids" VALUES (17, '55', 'access-sandbox-eee720b3-2190-4c31-a060-8657ab2421c4', '2023-07-31 07:05:29.713-07', '2023-07-31 07:05:29.713-07', 'BjPm8V451Gu3L3g5PopxINrbq5VQKEFwmGW7g', 'ins_56', 'Chase', 'Plaid Saving', 'depository', 'savings', '1111');
INSERT INTO "public"."plaids" VALUES (18, '53', 'access-sandbox-16480639-4ca1-4ee4-b511-dea63d751d07', '2023-08-15 23:24:31.531-07', '2023-08-15 23:24:31.531-07', 'KqrwRxP3MqhwXe7z9PjwFlrNa5vkdecVJerQ3', 'ins_127989', 'Bank of America', 'Plaid Checking', 'depository', 'checking', '0000');

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS "public"."roles";
CREATE TABLE "public"."roles" (
  "id" int4 NOT NULL,
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO "public"."roles" VALUES (1, 'user', '2023-05-02 02:02:29-07', '2023-05-02 02:02:35-07');
INSERT INTO "public"."roles" VALUES (2, 'admin', '2023-05-02 02:02:53-07', '2023-05-02 02:02:57-07');
INSERT INTO "public"."roles" VALUES (3, 'new', '2023-05-02 02:02:29-07', '2023-05-02 02:02:29-07');

-- ----------------------------
-- Table structure for shippingAddresses
-- ----------------------------
DROP TABLE IF EXISTS "public"."shippingAddresses";
CREATE TABLE "public"."shippingAddresses" (
  "id" int4 NOT NULL DEFAULT nextval('"shippingAddresses_id_seq"'::regclass),
  "userId" varchar(255) COLLATE "pg_catalog"."default",
  "address1" varchar(255) COLLATE "pg_catalog"."default",
  "address2" varchar(255) COLLATE "pg_catalog"."default",
  "address3" varchar(255) COLLATE "pg_catalog"."default",
  "city" varchar(255) COLLATE "pg_catalog"."default",
  "state" varchar(255) COLLATE "pg_catalog"."default",
  "country" varchar(255) COLLATE "pg_catalog"."default",
  "postalCode" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;

-- ----------------------------
-- Records of shippingAddresses
-- ----------------------------

-- ----------------------------
-- Table structure for stripes
-- ----------------------------
DROP TABLE IF EXISTS "public"."stripes";
CREATE TABLE "public"."stripes" (
  "id" int4 NOT NULL DEFAULT nextval('stripes_id_seq'::regclass),
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "customerId" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;

-- ----------------------------
-- Records of stripes
-- ----------------------------
INSERT INTO "public"."stripes" VALUES (1, 'rlalimurung@gmail.com', 'cus_OCDF8Wvm8mq1Np', '2023-07-03 08:36:54.929-07', '2023-07-03 08:36:54.929-07');
INSERT INTO "public"."stripes" VALUES (2, 'rlalimurung@gmail.com', 'cus_OCDFHXJffRqvVm', '2023-07-03 08:36:55.3-07', '2023-07-03 08:36:55.3-07');
INSERT INTO "public"."stripes" VALUES (5, 'freeskydiver1007@gmail.com', 'cus_OFH7e0Rb42NMqz', '2023-07-11 12:48:15.628-07', '2023-07-11 12:48:15.628-07');
INSERT INTO "public"."stripes" VALUES (6, 'freeskydiver1007@gmail.com', 'cus_OFH7BxHWx0T353', '2023-07-11 12:48:16.586-07', '2023-07-11 12:48:16.586-07');
INSERT INTO "public"."stripes" VALUES (8, 'globalhunter1007@gmail.com', 'cus_OKxlRhhVHs2S57', '2023-07-26 17:15:04.362-07', '2023-07-26 17:15:04.362-07');
INSERT INTO "public"."stripes" VALUES (7, 'globalhunter1007@gmail.com', 'cus_OKxlf3JZpIfwWX', '2023-07-26 17:15:04.355-07', '2023-07-26 17:15:04.355-07');
INSERT INTO "public"."stripes" VALUES (9, 'globalhunter1007@gmail.com', 'cus_OKxlBlrCRHLtx4', '2023-07-26 17:15:04.368-07', '2023-07-26 17:15:04.368-07');
INSERT INTO "public"."stripes" VALUES (10, 'globalhunter1007@gmail.com', 'cus_OKxlfqU6wJWE4V', '2023-07-26 17:15:04.38-07', '2023-07-26 17:15:04.38-07');

-- ----------------------------
-- Table structure for transactions
-- ----------------------------
DROP TABLE IF EXISTS "public"."transactions";
CREATE TABLE "public"."transactions" (
  "id" int4 NOT NULL DEFAULT nextval('transactions_id_seq'::regclass),
  "from" varchar(255) COLLATE "pg_catalog"."default",
  "to" varchar(255) COLLATE "pg_catalog"."default",
  "amount" float8,
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL
)
;

-- ----------------------------
-- Records of transactions
-- ----------------------------
INSERT INTO "public"."transactions" VALUES (7, '2', '7', 1000, '2023-05-15 16:21:33.763-07', '2023-05-15 16:21:33.763-07');
INSERT INTO "public"."transactions" VALUES (8, '2', '16', 6000, '2023-05-15 19:34:50.982-07', '2023-05-15 19:34:50.982-07');
INSERT INTO "public"."transactions" VALUES (10, '16', '10', 1000, '2023-05-16 03:30:31.489-07', '2023-05-16 03:30:31.489-07');
INSERT INTO "public"."transactions" VALUES (11, '16', '10', 1000, '2023-05-16 03:30:41.307-07', '2023-05-16 03:30:41.307-07');
INSERT INTO "public"."transactions" VALUES (12, '16', '10', 1000, '2023-05-16 03:32:50.901-07', '2023-05-16 03:32:50.901-07');
INSERT INTO "public"."transactions" VALUES (13, '16', '10', 1000, '2023-05-16 03:32:59.025-07', '2023-05-16 03:32:59.025-07');
INSERT INTO "public"."transactions" VALUES (14, '16', '10', 1000, '2023-05-16 03:33:04.413-07', '2023-05-16 03:33:04.413-07');
INSERT INTO "public"."transactions" VALUES (15, '10', '16', 1000, '2023-05-16 03:33:13.482-07', '2023-05-16 03:33:13.482-07');
INSERT INTO "public"."transactions" VALUES (16, '10', '13', 5000, '2023-05-16 17:38:19.75-07', '2023-05-16 17:38:19.75-07');
INSERT INTO "public"."transactions" VALUES (17, '10', NULL, 1000, '2023-05-18 10:00:22.542-07', '2023-05-18 10:00:22.542-07');
INSERT INTO "public"."transactions" VALUES (18, '10', NULL, 500, '2023-05-18 10:00:55.64-07', '2023-05-18 10:00:55.64-07');
INSERT INTO "public"."transactions" VALUES (19, '10', NULL, 500, '2023-05-18 10:20:34.836-07', '2023-05-18 10:20:34.836-07');
INSERT INTO "public"."transactions" VALUES (20, '2', NULL, 500, '2023-05-18 10:20:56.835-07', '2023-05-18 10:20:56.835-07');
INSERT INTO "public"."transactions" VALUES (21, '17', NULL, 10, '2023-05-18 10:35:00.986-07', '2023-05-18 10:35:00.986-07');
INSERT INTO "public"."transactions" VALUES (22, '17', NULL, 10, '2023-05-18 10:35:18.83-07', '2023-05-18 10:35:18.83-07');
INSERT INTO "public"."transactions" VALUES (23, '17', NULL, 10, '2023-05-18 10:35:20.323-07', '2023-05-18 10:35:20.323-07');
INSERT INTO "public"."transactions" VALUES (24, '17', NULL, 10, '2023-05-18 10:35:20.853-07', '2023-05-18 10:35:20.853-07');
INSERT INTO "public"."transactions" VALUES (25, '17', NULL, 10, '2023-05-18 10:35:21.531-07', '2023-05-18 10:35:21.531-07');
INSERT INTO "public"."transactions" VALUES (26, '17', NULL, 10, '2023-05-18 10:35:22.14-07', '2023-05-18 10:35:22.14-07');
INSERT INTO "public"."transactions" VALUES (27, '17', NULL, 10, '2023-05-18 10:35:22.62-07', '2023-05-18 10:35:22.62-07');
INSERT INTO "public"."transactions" VALUES (28, '17', NULL, 10, '2023-05-18 10:35:23.109-07', '2023-05-18 10:35:23.109-07');
INSERT INTO "public"."transactions" VALUES (29, '17', NULL, 10, '2023-05-18 10:35:23.773-07', '2023-05-18 10:35:23.773-07');
INSERT INTO "public"."transactions" VALUES (30, '17', NULL, 10, '2023-05-18 10:38:10.342-07', '2023-05-18 10:38:10.342-07');
INSERT INTO "public"."transactions" VALUES (31, '17', NULL, 10, '2023-05-18 10:38:15.611-07', '2023-05-18 10:38:15.611-07');
INSERT INTO "public"."transactions" VALUES (32, NULL, '17', 10, '2023-05-18 10:38:19.621-07', '2023-05-18 10:38:19.621-07');
INSERT INTO "public"."transactions" VALUES (33, NULL, '17', 10, '2023-05-18 10:38:20.308-07', '2023-05-18 10:38:20.308-07');
INSERT INTO "public"."transactions" VALUES (34, NULL, '17', 10, '2023-05-18 10:38:20.955-07', '2023-05-18 10:38:20.955-07');
INSERT INTO "public"."transactions" VALUES (35, NULL, '17', 10, '2023-05-18 10:38:21.289-07', '2023-05-18 10:38:21.289-07');
INSERT INTO "public"."transactions" VALUES (36, NULL, '17', 10, '2023-05-18 10:38:21.691-07', '2023-05-18 10:38:21.691-07');
INSERT INTO "public"."transactions" VALUES (37, NULL, '17', 10, '2023-05-18 10:38:22.065-07', '2023-05-18 10:38:22.065-07');
INSERT INTO "public"."transactions" VALUES (38, NULL, '17', 10, '2023-05-18 10:38:22.343-07', '2023-05-18 10:38:22.343-07');
INSERT INTO "public"."transactions" VALUES (39, '17', NULL, 10, '2023-05-18 10:38:23.259-07', '2023-05-18 10:38:23.259-07');
INSERT INTO "public"."transactions" VALUES (40, '17', NULL, 10, '2023-05-18 10:38:23.805-07', '2023-05-18 10:38:23.805-07');
INSERT INTO "public"."transactions" VALUES (41, '17', NULL, 10, '2023-05-18 10:38:24.005-07', '2023-05-18 10:38:24.005-07');
INSERT INTO "public"."transactions" VALUES (42, '17', NULL, 10, '2023-05-18 10:38:24.21-07', '2023-05-18 10:38:24.21-07');
INSERT INTO "public"."transactions" VALUES (43, '17', NULL, 10, '2023-05-18 10:38:24.42-07', '2023-05-18 10:38:24.42-07');
INSERT INTO "public"."transactions" VALUES (44, '17', NULL, 10, '2023-05-18 10:38:24.587-07', '2023-05-18 10:38:24.587-07');
INSERT INTO "public"."transactions" VALUES (45, '17', NULL, 10, '2023-05-18 10:38:24.756-07', '2023-05-18 10:38:24.756-07');
INSERT INTO "public"."transactions" VALUES (46, '17', NULL, 10, '2023-05-18 10:38:24.954-07', '2023-05-18 10:38:24.954-07');
INSERT INTO "public"."transactions" VALUES (47, '17', NULL, 10, '2023-05-18 10:38:25.652-07', '2023-05-18 10:38:25.652-07');
INSERT INTO "public"."transactions" VALUES (48, '17', NULL, 10, '2023-05-18 10:38:25.826-07', '2023-05-18 10:38:25.826-07');
INSERT INTO "public"."transactions" VALUES (49, '17', NULL, 10, '2023-05-18 10:38:26.007-07', '2023-05-18 10:38:26.007-07');
INSERT INTO "public"."transactions" VALUES (50, '17', NULL, 10, '2023-05-18 10:38:26.162-07', '2023-05-18 10:38:26.162-07');
INSERT INTO "public"."transactions" VALUES (51, '17', NULL, 10, '2023-05-18 10:38:26.315-07', '2023-05-18 10:38:26.315-07');
INSERT INTO "public"."transactions" VALUES (52, '17', NULL, 10, '2023-05-18 10:38:26.492-07', '2023-05-18 10:38:26.492-07');
INSERT INTO "public"."transactions" VALUES (53, '17', NULL, 10, '2023-05-18 10:38:26.659-07', '2023-05-18 10:38:26.659-07');
INSERT INTO "public"."transactions" VALUES (54, '17', NULL, 10, '2023-05-18 10:38:26.794-07', '2023-05-18 10:38:26.794-07');
INSERT INTO "public"."transactions" VALUES (55, '17', NULL, 10, '2023-05-18 10:38:26.961-07', '2023-05-18 10:38:26.961-07');
INSERT INTO "public"."transactions" VALUES (56, '17', NULL, 10, '2023-05-18 10:38:27.658-07', '2023-05-18 10:38:27.658-07');
INSERT INTO "public"."transactions" VALUES (57, '17', NULL, 10, '2023-05-18 10:38:28.099-07', '2023-05-18 10:38:28.099-07');
INSERT INTO "public"."transactions" VALUES (58, '17', NULL, 10, '2023-05-18 10:38:28.387-07', '2023-05-18 10:38:28.387-07');
INSERT INTO "public"."transactions" VALUES (59, '17', NULL, 10, '2023-05-18 10:38:28.562-07', '2023-05-18 10:38:28.562-07');
INSERT INTO "public"."transactions" VALUES (60, '17', NULL, 10, '2023-05-18 10:38:28.753-07', '2023-05-18 10:38:28.753-07');
INSERT INTO "public"."transactions" VALUES (61, '17', NULL, 10, '2023-05-18 10:38:28.93-07', '2023-05-18 10:38:28.93-07');
INSERT INTO "public"."transactions" VALUES (62, '17', NULL, 10, '2023-05-18 10:38:29.283-07', '2023-05-18 10:38:29.283-07');
INSERT INTO "public"."transactions" VALUES (63, '17', NULL, 10, '2023-05-18 10:38:29.852-07', '2023-05-18 10:38:29.852-07');
INSERT INTO "public"."transactions" VALUES (64, '17', NULL, 10, '2023-05-18 10:38:30.242-07', '2023-05-18 10:38:30.242-07');
INSERT INTO "public"."transactions" VALUES (65, NULL, '17', 10, '2023-05-18 10:59:12.455-07', '2023-05-18 10:59:12.455-07');
INSERT INTO "public"."transactions" VALUES (66, NULL, '17', 10, '2023-05-18 10:59:13.561-07', '2023-05-18 10:59:13.561-07');
INSERT INTO "public"."transactions" VALUES (67, NULL, '17', 10, '2023-05-18 10:59:13.81-07', '2023-05-18 10:59:13.81-07');
INSERT INTO "public"."transactions" VALUES (68, NULL, '17', 10, '2023-05-18 10:59:14.018-07', '2023-05-18 10:59:14.018-07');
INSERT INTO "public"."transactions" VALUES (69, NULL, '17', 10, '2023-05-18 10:59:14.56-07', '2023-05-18 10:59:14.56-07');
INSERT INTO "public"."transactions" VALUES (70, NULL, '17', 10, '2023-05-18 10:59:15.026-07', '2023-05-18 10:59:15.026-07');
INSERT INTO "public"."transactions" VALUES (71, NULL, '17', 10, '2023-05-18 10:59:15.659-07', '2023-05-18 10:59:15.659-07');
INSERT INTO "public"."transactions" VALUES (72, NULL, '17', 10, '2023-05-18 10:59:15.873-07', '2023-05-18 10:59:15.873-07');
INSERT INTO "public"."transactions" VALUES (73, NULL, '17', 10, '2023-05-18 10:59:16.347-07', '2023-05-18 10:59:16.347-07');
INSERT INTO "public"."transactions" VALUES (74, NULL, '17', 10, '2023-05-18 10:59:16.88-07', '2023-05-18 10:59:16.88-07');
INSERT INTO "public"."transactions" VALUES (75, '17', NULL, 10, '2023-05-19 15:10:21.87-07', '2023-05-19 15:10:21.87-07');
INSERT INTO "public"."transactions" VALUES (76, '17', NULL, 10, '2023-05-19 15:10:22.537-07', '2023-05-19 15:10:22.537-07');
INSERT INTO "public"."transactions" VALUES (77, '17', NULL, 10, '2023-05-19 15:10:22.704-07', '2023-05-19 15:10:22.704-07');
INSERT INTO "public"."transactions" VALUES (78, '17', NULL, 10, '2023-05-19 15:10:22.856-07', '2023-05-19 15:10:22.856-07');
INSERT INTO "public"."transactions" VALUES (79, '17', NULL, 10, '2023-05-19 15:11:16.56-07', '2023-05-19 15:11:16.56-07');
INSERT INTO "public"."transactions" VALUES (80, '17', NULL, 10, '2023-05-19 15:11:16.992-07', '2023-05-19 15:11:16.992-07');
INSERT INTO "public"."transactions" VALUES (81, '17', NULL, 10, '2023-05-19 15:11:17.489-07', '2023-05-19 15:11:17.489-07');
INSERT INTO "public"."transactions" VALUES (82, '17', NULL, 10, '2023-05-19 15:11:17.769-07', '2023-05-19 15:11:17.769-07');
INSERT INTO "public"."transactions" VALUES (83, '17', NULL, 10, '2023-05-19 15:11:17.943-07', '2023-05-19 15:11:17.943-07');
INSERT INTO "public"."transactions" VALUES (84, '17', NULL, 10, '2023-05-19 15:11:18.129-07', '2023-05-19 15:11:18.129-07');
INSERT INTO "public"."transactions" VALUES (85, '17', NULL, 10, '2023-05-19 15:11:18.343-07', '2023-05-19 15:11:18.343-07');
INSERT INTO "public"."transactions" VALUES (86, '17', NULL, 10, '2023-05-19 15:11:18.522-07', '2023-05-19 15:11:18.522-07');
INSERT INTO "public"."transactions" VALUES (87, '17', NULL, 10, '2023-05-19 15:11:18.704-07', '2023-05-19 15:11:18.704-07');
INSERT INTO "public"."transactions" VALUES (88, '17', NULL, 10, '2023-05-19 15:11:18.857-07', '2023-05-19 15:11:18.857-07');
INSERT INTO "public"."transactions" VALUES (89, '17', NULL, 10, '2023-05-19 15:11:19.015-07', '2023-05-19 15:11:19.015-07');
INSERT INTO "public"."transactions" VALUES (90, '17', NULL, 10, '2023-05-19 15:11:19.17-07', '2023-05-19 15:11:19.17-07');
INSERT INTO "public"."transactions" VALUES (91, '17', NULL, 10, '2023-05-19 15:11:19.327-07', '2023-05-19 15:11:19.327-07');
INSERT INTO "public"."transactions" VALUES (92, '17', NULL, 10, '2023-05-19 15:11:19.496-07', '2023-05-19 15:11:19.496-07');
INSERT INTO "public"."transactions" VALUES (93, '17', NULL, 10, '2023-05-19 15:11:19.656-07', '2023-05-19 15:11:19.656-07');
INSERT INTO "public"."transactions" VALUES (94, '17', NULL, 10, '2023-05-19 15:11:19.833-07', '2023-05-19 15:11:19.833-07');
INSERT INTO "public"."transactions" VALUES (95, '17', NULL, 10, '2023-05-19 15:11:19.992-07', '2023-05-19 15:11:19.992-07');
INSERT INTO "public"."transactions" VALUES (96, '17', NULL, 10, '2023-05-19 15:12:16.879-07', '2023-05-19 15:12:16.879-07');
INSERT INTO "public"."transactions" VALUES (97, '17', NULL, 10, '2023-05-19 15:12:17.288-07', '2023-05-19 15:12:17.288-07');
INSERT INTO "public"."transactions" VALUES (98, '17', NULL, 10, '2023-05-19 15:12:17.714-07', '2023-05-19 15:12:17.714-07');
INSERT INTO "public"."transactions" VALUES (99, '17', NULL, 10, '2023-05-19 15:12:18.062-07', '2023-05-19 15:12:18.062-07');
INSERT INTO "public"."transactions" VALUES (100, '17', NULL, 10, '2023-05-19 15:12:18.391-07', '2023-05-19 15:12:18.391-07');
INSERT INTO "public"."transactions" VALUES (101, '17', NULL, 10, '2023-05-19 15:12:18.706-07', '2023-05-19 15:12:18.706-07');
INSERT INTO "public"."transactions" VALUES (102, '17', NULL, 10, '2023-05-19 15:12:19.281-07', '2023-05-19 15:12:19.281-07');
INSERT INTO "public"."transactions" VALUES (103, '17', NULL, 10, '2023-05-19 15:12:19.707-07', '2023-05-19 15:12:19.707-07');
INSERT INTO "public"."transactions" VALUES (104, '17', NULL, 10, '2023-05-19 15:12:20.121-07', '2023-05-19 15:12:20.121-07');
INSERT INTO "public"."transactions" VALUES (105, '17', NULL, 10, '2023-05-19 15:12:20.623-07', '2023-05-19 15:12:20.623-07');
INSERT INTO "public"."transactions" VALUES (106, '17', NULL, 10, '2023-05-20 20:56:08.16-07', '2023-05-20 20:56:08.16-07');
INSERT INTO "public"."transactions" VALUES (107, '17', NULL, 10, '2023-05-20 20:56:35.849-07', '2023-05-20 20:56:35.849-07');
INSERT INTO "public"."transactions" VALUES (108, '17', NULL, 10, '2023-05-20 20:56:38.943-07', '2023-05-20 20:56:38.943-07');
INSERT INTO "public"."transactions" VALUES (109, '17', NULL, 10, '2023-05-20 20:56:40.133-07', '2023-05-20 20:56:40.133-07');
INSERT INTO "public"."transactions" VALUES (110, '17', NULL, 10, '2023-05-20 20:58:10.615-07', '2023-05-20 20:58:10.615-07');
INSERT INTO "public"."transactions" VALUES (111, '17', NULL, 10, '2023-05-20 20:58:10.787-07', '2023-05-20 20:58:10.787-07');
INSERT INTO "public"."transactions" VALUES (112, '17', NULL, 10, '2023-05-20 20:58:11.228-07', '2023-05-20 20:58:11.228-07');
INSERT INTO "public"."transactions" VALUES (113, '17', NULL, 10, '2023-05-20 20:58:11.451-07', '2023-05-20 20:58:11.451-07');
INSERT INTO "public"."transactions" VALUES (114, '17', NULL, 10, '2023-05-20 20:58:12.019-07', '2023-05-20 20:58:12.019-07');
INSERT INTO "public"."transactions" VALUES (115, '17', NULL, 10, '2023-05-20 20:58:12.363-07', '2023-05-20 20:58:12.363-07');
INSERT INTO "public"."transactions" VALUES (116, '17', NULL, 100, '2023-05-20 21:07:30.887-07', '2023-05-20 21:07:30.887-07');
INSERT INTO "public"."transactions" VALUES (117, '17', NULL, 100, '2023-05-20 21:07:31.347-07', '2023-05-20 21:07:31.347-07');
INSERT INTO "public"."transactions" VALUES (118, '17', NULL, 100, '2023-05-20 21:07:42.362-07', '2023-05-20 21:07:42.362-07');
INSERT INTO "public"."transactions" VALUES (119, '17', NULL, 100, '2023-05-20 21:07:43.026-07', '2023-05-20 21:07:43.026-07');
INSERT INTO "public"."transactions" VALUES (120, '17', NULL, 100, '2023-05-20 21:07:43.762-07', '2023-05-20 21:07:43.762-07');
INSERT INTO "public"."transactions" VALUES (121, '17', NULL, 100, '2023-05-22 02:00:06.043-07', '2023-05-22 02:00:06.043-07');
INSERT INTO "public"."transactions" VALUES (122, '17', NULL, 100, '2023-05-22 02:00:06.231-07', '2023-05-22 02:00:06.231-07');
INSERT INTO "public"."transactions" VALUES (123, '17', NULL, 100, '2023-05-22 02:00:06.491-07', '2023-05-22 02:00:06.491-07');
INSERT INTO "public"."transactions" VALUES (124, '17', NULL, 100, '2023-05-22 02:00:06.691-07', '2023-05-22 02:00:06.691-07');
INSERT INTO "public"."transactions" VALUES (125, '17', NULL, 100, '2023-05-22 02:00:06.876-07', '2023-05-22 02:00:06.876-07');
INSERT INTO "public"."transactions" VALUES (126, '17', NULL, 100, '2023-05-22 02:00:07.051-07', '2023-05-22 02:00:07.051-07');
INSERT INTO "public"."transactions" VALUES (127, '17', NULL, 100, '2023-05-22 02:00:07.212-07', '2023-05-22 02:00:07.212-07');
INSERT INTO "public"."transactions" VALUES (128, '17', NULL, 100, '2023-05-22 02:00:07.371-07', '2023-05-22 02:00:07.371-07');
INSERT INTO "public"."transactions" VALUES (129, '17', NULL, 100, '2023-05-22 02:00:07.685-07', '2023-05-22 02:00:07.685-07');
INSERT INTO "public"."transactions" VALUES (130, '17', NULL, 100, '2023-05-22 02:00:07.884-07', '2023-05-22 02:00:07.884-07');
INSERT INTO "public"."transactions" VALUES (131, '17', NULL, 100, '2023-05-22 02:00:08.027-07', '2023-05-22 02:00:08.027-07');
INSERT INTO "public"."transactions" VALUES (132, '17', NULL, 100, '2023-05-22 02:00:08.188-07', '2023-05-22 02:00:08.188-07');
INSERT INTO "public"."transactions" VALUES (133, '17', NULL, 100, '2023-05-22 02:00:08.355-07', '2023-05-22 02:00:08.355-07');
INSERT INTO "public"."transactions" VALUES (134, '17', NULL, 100, '2023-05-22 02:00:08.523-07', '2023-05-22 02:00:08.523-07');
INSERT INTO "public"."transactions" VALUES (135, '17', NULL, 100, '2023-05-22 02:00:08.676-07', '2023-05-22 02:00:08.676-07');
INSERT INTO "public"."transactions" VALUES (136, '17', NULL, 100, '2023-05-22 02:00:08.835-07', '2023-05-22 02:00:08.835-07');
INSERT INTO "public"."transactions" VALUES (137, '17', NULL, 100, '2023-05-22 02:00:09.019-07', '2023-05-22 02:00:09.019-07');
INSERT INTO "public"."transactions" VALUES (138, '17', NULL, 100, '2023-05-22 02:00:09.172-07', '2023-05-22 02:00:09.172-07');
INSERT INTO "public"."transactions" VALUES (139, '17', NULL, 100, '2023-05-22 02:00:09.339-07', '2023-05-22 02:00:09.339-07');
INSERT INTO "public"."transactions" VALUES (140, '17', NULL, 100, '2023-05-22 02:00:09.796-07', '2023-05-22 02:00:09.796-07');
INSERT INTO "public"."transactions" VALUES (141, '17', NULL, 100, '2023-05-22 02:00:09.955-07', '2023-05-22 02:00:09.955-07');
INSERT INTO "public"."transactions" VALUES (142, '17', NULL, 100, '2023-05-22 02:00:10.155-07', '2023-05-22 02:00:10.155-07');
INSERT INTO "public"."transactions" VALUES (143, '17', NULL, 100, '2023-05-22 02:00:10.331-07', '2023-05-22 02:00:10.331-07');
INSERT INTO "public"."transactions" VALUES (144, '17', NULL, 100, '2023-05-22 02:00:10.523-07', '2023-05-22 02:00:10.523-07');
INSERT INTO "public"."transactions" VALUES (145, '17', NULL, 100, '2023-05-22 02:00:10.692-07', '2023-05-22 02:00:10.692-07');
INSERT INTO "public"."transactions" VALUES (146, '17', NULL, 100, '2023-05-22 02:00:10.859-07', '2023-05-22 02:00:10.859-07');
INSERT INTO "public"."transactions" VALUES (147, '17', NULL, 100, '2023-05-22 02:00:11.047-07', '2023-05-22 02:00:11.047-07');
INSERT INTO "public"."transactions" VALUES (148, '17', NULL, 100, '2023-05-22 02:00:11.203-07', '2023-05-22 02:00:11.203-07');
INSERT INTO "public"."transactions" VALUES (149, '17', NULL, 100, '2023-05-22 02:00:11.348-07', '2023-05-22 02:00:11.348-07');
INSERT INTO "public"."transactions" VALUES (150, '17', NULL, 100, '2023-05-22 02:00:11.515-07', '2023-05-22 02:00:11.515-07');
INSERT INTO "public"."transactions" VALUES (151, '17', NULL, 100, '2023-05-22 02:00:11.819-07', '2023-05-22 02:00:11.819-07');
INSERT INTO "public"."transactions" VALUES (152, '17', NULL, 100, '2023-05-22 02:00:11.982-07', '2023-05-22 02:00:11.982-07');
INSERT INTO "public"."transactions" VALUES (153, '17', NULL, 100, '2023-05-22 02:00:15.483-07', '2023-05-22 02:00:15.483-07');

-- ----------------------------
-- Table structure for userRoles
-- ----------------------------
DROP TABLE IF EXISTS "public"."userRoles";
CREATE TABLE "public"."userRoles" (
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL,
  "roleId" int4 NOT NULL,
  "userId" int4 NOT NULL
)
;

-- ----------------------------
-- Records of userRoles
-- ----------------------------
INSERT INTO "public"."userRoles" VALUES ('2023-07-02 23:07:57.964-07', '2023-07-02 23:07:57.964-07', 1, 53);
INSERT INTO "public"."userRoles" VALUES ('2023-07-10 10:29:39.04-07', '2023-07-10 10:29:39.04-07', 1, 55);
INSERT INTO "public"."userRoles" VALUES ('2023-07-26 17:15:01.582-07', '2023-07-26 17:15:01.582-07', 1, 56);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS "public"."users";
CREATE TABLE "public"."users" (
  "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  "username" varchar(255) COLLATE "pg_catalog"."default",
  "email" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" timestamptz(6) NOT NULL,
  "updatedAt" timestamptz(6) NOT NULL,
  "accountType" int2,
  "userAvatar" text COLLATE "pg_catalog"."default",
  "fullName" varchar(255) COLLATE "pg_catalog"."default",
  "contactNumber" varchar(255) COLLATE "pg_catalog"."default",
  "zipCode" varchar(255) COLLATE "pg_catalog"."default",
  "city" varchar(255) COLLATE "pg_catalog"."default",
  "state" varchar(255) COLLATE "pg_catalog"."default",
  "usCitizen" bool,
  "mtcAmount" float4 DEFAULT 0,
  "gender" varchar(255) COLLATE "pg_catalog"."default",
  "birthDate" varchar(255) COLLATE "pg_catalog"."default",
  "address" varchar(255) COLLATE "pg_catalog"."default"
)
;
COMMENT ON COLUMN "public"."users"."accountType" IS '1:nbbl account, 2: google account';

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO "public"."users" VALUES (7, 'serser', 'gserhs@sdfg.com', '2023-05-06 20:24:23.872-07', '2023-05-21 17:50:05.438-07', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO "public"."users" VALUES (10, 'shsreh', 'drth@dh.com', '2023-05-06 20:38:22.967-07', '2023-05-21 17:50:54.477-07', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO "public"."users" VALUES (18, 'asdf', 'asdf@new.com', '2023-05-21 02:36:28.166-07', '2023-05-21 18:02:01.596-07', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO "public"."users" VALUES (16, 'ftykf', 'dsrtj@er.com', '2023-05-07 19:08:33.751-07', '2023-05-21 18:06:39.186-07', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO "public"."users" VALUES (13, 'srh', 'srth@sfd.com', '2023-05-06 21:28:38.224-07', '2023-05-21 19:05:12.887-07', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO "public"."users" VALUES (2, 'testname', 'test@test.com', '2023-05-02 02:03:57.73-07', '2023-05-31 22:21:39.789-07', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO "public"."users" VALUES (17, 'Leo Reed', 'ekessler1095@gmail.com', '2023-05-15 12:18:39.562-07', '2023-06-04 18:56:44.835-07', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO "public"."users" VALUES (36, 'Torres', 'nbbl@user.com', '2023-06-01 11:42:55.532-07', '2023-06-12 16:01:26.425-07', 1, 'data:image/png;base64,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', 'Doe', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL);
INSERT INTO "public"."users" VALUES (52, '', 'undefined', '2023-06-12 13:43:49.68-07', '2023-06-12 13:43:49.68-07', 1, NULL, '', NULL, NULL, NULL, NULL, 't', 0, NULL, NULL, NULL);
INSERT INTO "public"."users" VALUES (38, '', 'test@mail.com', '2023-06-06 18:40:13.907-07', '2023-06-06 18:40:13.907-07', 1, '', NULL, NULL, NULL, NULL, NULL, 'f', 0, NULL, NULL, NULL);
INSERT INTO "public"."users" VALUES (56, 'globalhunter1007', 'globalhunter1007@gmail.com', '2023-07-26 17:15:01.535-07', '2023-07-27 05:04:46.155-07', 1, '/images/defaultAvatar.jpg', 'THomas', '(143) 232-1424', NULL, NULL, NULL, 'f', 0, 'm', NULL, NULL);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."accessTokens_id_seq"
OWNED BY "public"."accessTokens"."id";
SELECT setval('"public"."accessTokens_id_seq"', 2276, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."addresses_id_seq"
OWNED BY "public"."addresses"."id";
SELECT setval('"public"."addresses_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."balanceHistories_id_seq"
OWNED BY "public"."balanceHistories"."id";
SELECT setval('"public"."balanceHistories_id_seq"', 62, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."cakepayments_id_seq"
OWNED BY "public"."cakepayments"."id";
SELECT setval('"public"."cakepayments_id_seq"', 4, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."notifications_id_seq"
OWNED BY "public"."notifications"."id";
SELECT setval('"public"."notifications_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."plaids_id_seq"
OWNED BY "public"."plaids"."id";
SELECT setval('"public"."plaids_id_seq"', 18, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."shippingAddresses_id_seq"
OWNED BY "public"."shippingAddresses"."id";
SELECT setval('"public"."shippingAddresses_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."stripes_id_seq"
OWNED BY "public"."stripes"."id";
SELECT setval('"public"."stripes_id_seq"', 10, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."transactions_id_seq"
OWNED BY "public"."transactions"."id";
SELECT setval('"public"."transactions_id_seq"', 154, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."users_id_seq"
OWNED BY "public"."users"."id";
SELECT setval('"public"."users_id_seq"', 56, true);

-- ----------------------------
-- Primary Key structure for table accessTokens
-- ----------------------------
ALTER TABLE "public"."accessTokens" ADD CONSTRAINT "accessTokens_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table addresses
-- ----------------------------
ALTER TABLE "public"."addresses" ADD CONSTRAINT "addresses_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table balanceHistories
-- ----------------------------
ALTER TABLE "public"."balanceHistories" ADD CONSTRAINT "balanceHistories_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table cakepayments
-- ----------------------------
ALTER TABLE "public"."cakepayments" ADD CONSTRAINT "cakepayments_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table notifications
-- ----------------------------
ALTER TABLE "public"."notifications" ADD CONSTRAINT "notifications_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table plaids
-- ----------------------------
ALTER TABLE "public"."plaids" ADD CONSTRAINT "plaids_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table roles
-- ----------------------------
ALTER TABLE "public"."roles" ADD CONSTRAINT "roles_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table shippingAddresses
-- ----------------------------
ALTER TABLE "public"."shippingAddresses" ADD CONSTRAINT "shippingAddresses_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table stripes
-- ----------------------------
ALTER TABLE "public"."stripes" ADD CONSTRAINT "stripes_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table transactions
-- ----------------------------
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table userRoles
-- ----------------------------
ALTER TABLE "public"."userRoles" ADD CONSTRAINT "userRoles_pkey" PRIMARY KEY ("roleId", "userId");

-- ----------------------------
-- Primary Key structure for table users
-- ----------------------------
ALTER TABLE "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Foreign Keys structure for table userRoles
-- ----------------------------
ALTER TABLE "public"."userRoles" ADD CONSTRAINT "userRoles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "public"."roles" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "public"."userRoles" ADD CONSTRAINT "userRoles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
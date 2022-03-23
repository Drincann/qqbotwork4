use qqwork;
SET
  NAMES utf8mb4;
SET
  FOREIGN_KEY_CHECKS = 0;
-- ----------------------------
  -- Table structure for qq_group_msg
  -- ----------------------------
  DROP TABLE IF EXISTS `qq_group_msg`;
CREATE TABLE `qq_group_msg` (
    `id` bigint(22) NOT NULL AUTO_INCREMENT,
    `user_group_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '用户群昵称',
    `user_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '用户QQ号',
    `send_time` datetime NULL DEFAULT NULL COMMENT '消息发送时间',
    `message` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '消息内容',
    `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
    `group_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '群名',
    `group_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '群号',
    `model_number` bigint(22) NULL DEFAULT NULL COMMENT '模值',
    `hash_md5` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT '' COMMENT '消息md5',
    `user_phone_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '手机号',
    PRIMARY KEY (`id`) USING BTREE
  ) ENGINE = InnoDB AUTO_INCREMENT = 69447 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;
SET
  FOREIGN_KEY_CHECKS = 1;
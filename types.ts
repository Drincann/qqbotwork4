import { GroupPermission, MessageType } from 'mirai-js/src/BaseType'
import md5 from 'md5'
import { Bot } from 'mirai-js';

// the type of the table of the database
export namespace MySQLSchema {
    export interface QQGroupMsgTableSchema {
        id?: number;
        user_group_name?: string;
        user_number?: string;
        send_time?: string;
        message?: string;
        create_time?: string;
        group_name?: string;
        group_number?: string;
        model_number?: string;
        hash_md5?: string;
        user_phone_number?: string;
    }
}

// the type of the mirai GroupMessage context
export namespace Mirai {
    export interface GroupMessageData {
        bot: Bot,
        type: "GroupMessage";
        sender: {
            id: number;
            memberName: string;
            specialTitle: string;
            permission: GroupPermission;
            joinTimestamp: number;
            lastSpeakTimestamp: number;
            muteTimeRemaining: number;
            group: {
                id: number;
                name: string;
                permission: GroupPermission;
            };
        };
        messageChain: MessageType[];
        // extends
        mysqlObj?: MySQLSchema.QQGroupMsgTableSchema;
        text?: string;
    }
}

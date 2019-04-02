// 上传导入的配置文件
export function GET_BATCH_IMPORT_CONFIG(item = {}) {
    return {
        'MYSQL_PRODUCT': {
            'PARAMETER': {
                host: item.host,
                instance_name: item.instance_name,
                param_key: item.param_key,
                param_value: item.param_value
            },
            'AUTHORIZATION': {
                host: item.host,
                instance_name: item.instance_name,
                object_owner: item.object_owner,
                object_name: item.object_name,
                authority: item.authority,
                is_create_user: item.is_create_user,
                grantee: item.grantee,
                password: item.password
            },
            'WHITELIST': {
                host: item.host,
                instance_name: item.instance_name,
                authority_type: item.authority_type
            }
        },
        'ORACLE_PRODUCT': {
            'PARAMETER': {
                host: item.host,
                instance_name: item.instance_name,
                param_key: item.param_key,
                param_value: item.param_value
            },
            'AUTHORIZATION': {
                host: item.host,
                instance_name: item.instance_name,
                authority_type: item.authority_type,
                authority: item.authority,
                object_owner: item.object_owner,
                object_name: item.object_name,
                is_create_user: item.is_create_user,
                grantee: item.grantee,
                password: item.password
            },
            'WHITELIST': {
                host: item.host,
                instance_name: item.instance_name,
                object_owner: item.object_owner,
                authority_type: item.authority_type
            }
        },
        'DB2_PRODUCT': {
            'PARAMETER': {
                host: item.host,
                instance_name: item.instance_name,
                object_owner: item.object_owner,
                param_type: item.param_type,
                param_key: item.param_key,
                param_value: item.param_value
            },
            'AUTHORIZATION': {
                host: item.host,
                instance_name: item.instance_name,
                object_owner: item.object_owner,
                object_owner: item.object_owner,
                object_name: item.object_name,
                authority: item.authority,
                grantee: item.grantee
            },
            'WHITELIST': {
                host: item.host,
                instance_name: item.instance_name,
                object_owner: item.object_owner
            }
        },
        'SQLSERVER_PRODUCT': {
            'WHITELIST': {
                host: item.host,
                instance_name: item.instance_name,
                object_owner: item.object_owner,
                authority_type: item.authority_type
            }
        }
    }
}
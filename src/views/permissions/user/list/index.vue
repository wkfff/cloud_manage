<!--
  @author:  lzc
  @date:    2019-01-29
  @desc:    xx->xx
  @require:
-->
<template>
  <div class="view-wrapper">
    <div class="wrapper-content">
      <CloudFilters
        :filterProps="filterProps">
        <el-button
          v-permission="'redis_apply_create'"
          type="primary"
          icon="el-icon-plus"
          @click="createModal = true"
        >新建用户
        </el-button>
        <CloudMoreButton
          :options="moreBtnOptions"
          :dropItems="dropItems"
          @command="changeCommand"
        />
      </CloudFilters>
      <CloudTable
        ref="listTable"
        :table-config="tableConfig"
        :column-config="columnConfig"
        :fetch-config="fetchConfig"
      />
    </div>
    
    <!--添加用户-->
    <CreateUser
      v-model="createModal"
    />
    <!--关联角色-->
    <RoleAssociation
      v-model="associationModal"
    />
    <!--添加到组-->
    <AddGroup
      v-model="addGroupModal"
    />
  </div>
</template>

<script type="text/jsx">
import CloudTable from '@/components/CloudTable'
import CloudMoreButton from '@/components/CloudMoreButton'
import CloudFilters from '@/components/CloudFilters'
import TableMixin from '@/components/CloudTable/TableMixin'
import CreateUser from './components/CreateUser'
import RoleAssociation from './components/RoleAssociation'
import AddGroup from './components/AddGroup'
import { GET_USER_LIST } from '@/api/permissions'
import { INSTANCE_REDIS } from '@/utils/constant'

export default {
  name: 'PermissionsUser',
  
  components: {
    CloudTable,
    CreateUser,
    CloudFilters,
    CloudMoreButton,
    RoleAssociation,
    AddGroup
  },
  
  mixins: [TableMixin],
  
  data() {
    const filterProps = {
      reloadProps: [
        {
          onClick: this.search.bind(this)
        }
      ],
      searchProps: {
        options: [
          { label: '实例名称', value: 'display_name' },
          { label: '描述', value: 'instance_desc' },
          { label: '所属业务', value: 'business_name' }
        ],
        onClick: this.handleSearch.bind(this)
      }
    }
    const fetchConfig = {
      url: GET_USER_LIST,
      data: {
        paging: 1
      }
    }
    return {
      fetchConfig,
      filterProps,
      selections: [],
      createModal: false, // 新增用户
      addGroupModal: false, // 添加到组
      associationModal: false // 关联角色
    }
  },
  
  computed: {
    /**
     * 头部更多按钮设置
     * @return {{hasBorder: boolean}}
     */
    moreBtnOptions() {
      return {
        hasBorder: true,
        disabled: !this.selections.length
      }
    },
    
    /**
     * 头部更多按钮下拉
     * @return {*[]}
     */
    dropItems() {
      return [
        {
          label: '添加到组',
          value: 'batchAddGroup'
        },
        {
          label: '关联角色',
          value: 'batchAddRole'
        },
        {
          label: '禁用用户',
          value: 'batchDisabledUser'
        },
        {
          label: '删除用户',
          value: 'batchDeleteUser'
        }
      ]
    },
    
    /**
     * table设置
     * @return {{hasBorder: boolean}}
     */
    tableConfig() {
      const _this = this
      return {
        hasSelection: true,
        events: {
          'selection-change': data => {
            _this.selections = data
          }
        }
      }
    },
    
    /**
     * table列配置
     * @return {*}
     */
    columnConfig() {
      return [
        {
          label: '用户名',
          prop: 'user_name',
          render: (h, { row }) => {
            return (
              <router-link
                to={ { name: 'PermissionsUserDetail', params: { id: row.id } } }
                class="text-active">{ row.user_name }</router-link>
            )
          }
        },
        {
          label: '工号',
          prop: 'instance_desc'
        },
        {
          label: '描述',
          prop: 'area'
        },
        {
          label: '关联角色',
          prop: 'business'
        },
        {
          label: '所属用户组',
          prop: 'architecture',
          width: 100
        },
        {
          label: '状态',
          prop: 'db_spec',
          filterHead: true,
          columnFilters: INSTANCE_REDIS.AREA,
          render(h, { row }) {
            return '-'
          }
        },
        {
          label: '创建时间',
          prop: 'created_at',
          sortable: 'custom',
          width: 120
        },
        {
          label: '操作',
          render() {
            return (
              <el-button class="text-error" type="text">删除</el-button>
            )
          }
        }
      ]
    }
  },
  
  methods: {
    /**
     * 查询table
     * @param params
     */
    handleSearch(params) {
      this.fetchConfig.data = Object.assign({}, this.fetchConfig.data, params)
      this.search()
    },
    
    /**
     * 头部下拉选择
     * @param value
     */
    changeCommand({ value }) {
      if (this[value] && typeof this[value] === 'function') {
        this[value]()
      }
    },
    
    batchAddGroup() {
    
    },
    
    batchAddRole() {
    
    },
    
    batchDisabledUser() {
    
    },
    
    batchDeleteUser() {
    
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wrapper-content{
  background-color: #fff;
  padding: 20px;
}
</style>

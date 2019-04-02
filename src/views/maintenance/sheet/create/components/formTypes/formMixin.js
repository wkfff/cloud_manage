/**
 * @author: Daniel
 * @date:   2019-01-22
 * @desc:   描述
 */
import CloudForm from "@/components/CloudForm";

export default {
    
    components: {
        CloudForm
    },
    
    props: {
        productNameProps: {
          type: String,
          default: ""
        },
        maintenanceNameProps: {
          type: String,
          default: ""
        },
        productCodeProps: {
          type: String,
          default: ""
        },
        maintenanceCodeProps: {
          type: String,
          default: ""
        }
    },

    mounted() {
        // 由于子组件没有方法出发表单提交，所以默认在挂在之后进行emit
        this.$emit('handleNode', this.$children[0])
    },

    watch: {
        
    }
  }
  
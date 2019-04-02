# vuex-fields

vuex数据与表单双向绑定插件

### 基本示例

#### Store

```js
import Vue from 'vue';
import Vuex from 'vuex';
import { getField, updateField } from '@/plugins/vuex-fields';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fieldA: '',
    fieldB: '',
  },
  getters: {
    getField
  },
  mutations: {
    updateField
  },
});
```

#### Component

```html
<template>
  <div id="app">
    <input v-model="fieldA">
    <input v-model="fieldB">
  </div>
</template>

<script>
import { mapFields } from '@/plugins/vuex-fields';

export default {
  computed: {
    ...mapFields([
      'fieldA',
      'fieldB',
    ]),
  },
};
</script>
```

### 嵌套属性使用示例

#### Store

```js
import Vue from 'vue';
import Vuex from 'vuex';

import { getField, updateField } from '@/plugins/vuex-fields';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      firstName: '',
      lastName: '',
    },
    addresses: [
      {
        town: '',
      },
    ],
  },
  getters: {
    getField,
  },
  mutations: {
    updateField,
  },
});
```

#### Component

```html
<template>
  <div id="app">
    <input v-model="firstName">
    <input v-model="lastName">
    <input v-model="town">
  </div>
</template>

<script>
import { mapFields } from '@/plugins/vuex-fields';

export default {
  computed: {
    ...mapFields([
      'user.firstName',
      'user.lastName',
      'addresses[0].town'
    ]),
  },
};
</script>
```


### 重命名属性示例

```html
<template>
  <div id="app">
    <input v-model="userFirstName">
    <input v-model="userLastName">
  </div>
</template>

<script>
import { mapFields } from '@/plugins/vuex-fields';

export default {
  computed: {
    ...mapFields({
      userFirstName: 'user.firstName',
      userLastName: 'user.lastName',
    }),
  },
};
</script>
```

### 自定义 getters 和 mutations示例

#### Store

```js
import Vue from 'vue';
import Vuex from 'vuex';

import { getField, updateField } from '@/plugins/vuex-fields';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      firstName: '',
      lastName: '',
    },
  },
  getters: {
    getUserField(state) {
      return getField(state.user);
    },
  },
  mutations: {
    updateUserField(state, field) {
      updateField(state.user, field);
    },
  },
});
```

#### Component

```html
<template>
  <div id="app">
    <input v-model="firstName">
    <input v-model="lastName">
  </div>
</template>

<script>
import { createHelpers } from '@/plugins/vuex-fields';

const { mapFields } = createHelpers({
  getterType: 'getUserField',
  mutationType: 'updateUserField',
});

export default {
  computed: {
    // 在getters和mutations中指定了某对象，不需要写 user.
    ...mapFields([
      'firstName',
      'lastName',
    ]),
  },
};
</script>
```

### vuex模块使用示例

#### Store

```js
import Vue from 'vue';
import Vuex from 'vuex';

import { createHelpers } from '@/plugins/vuex-fields';

const { getFooField, updateFooField } = createHelpers({
  getterType: 'getFooField',
  mutationType: 'updateFooField',
});

Vue.use(Vuex);

export default new Vuex.Store({
  // ...
  modules: {
    fooModule: {
      state: {
        foo: '',
      },
      getters: {
        getFooField,
      },
      mutations: {
        updateFooField,
      },
    },
  },
});
```

#### Component

```html
<template>
  <div id="app">
    <input v-model="foo">
  </div>
</template>

<script>
import { createHelpers } from '@/plugins/vuex-fields';

const { mapFields } = createHelpers({
  getterType: 'getFooField',
  mutationType: 'updateFooField',
});

export default {
  computed: {
    ...mapFields(['foo']),
  },
};
</script>
```

### 命名空间模块使用示例

#### Store

```js
import Vue from 'vue';
import Vuex from 'vuex';

import { getField, updateField } from '@/plugins/vuex-fields';

Vue.use(Vuex);

export default new Vuex.Store({
  // ...
  modules: {
    fooModule: {
      namespaced: true,
      state: {
        foo: '',
      },
      getters: {
        getField,
      },
      mutations: {
        updateField,
      },
    },
  },
});
```

#### Component

```html
<template>
  <div id="app">
    <input v-model="foo">
  </div>
</template>

<script>
import { createHelpers } from '@/plugins/vuex-fields';

const { mapFields } = createHelpers({
  getterType: 'fooModule/getField',
  mutationType: 'fooModule/updateField',
});

export default {
  computed: {
    ...mapFields(['foo']),
  },
};
</script>
```

或者可以通过模块的命名空间 mapFields 函数的第一个参数使用

```html
<template>
  <div id="app">
    <input v-model="foo">
  </div>
</template>

<script>
import { mapFields } from '@/plugins/vuex-fields';

export default {
  computed: {
    ...mapFields(`fooModule`, ['foo']),
  },
};
</script>
```

### 多行数组类型绑定示例

#### Store

```js
import Vue from 'vue';
import Vuex from 'vuex';

import { getField, updateField } from '@/plugins/vuex-fields';

Vue.use(Vuex);

export default new Vuex.Store({
  // ...
  state: {
    addresses: [
      {
        zip: '12345',
        town: 'Foo Town',
      },
      {
        zip: '54321',
        town: 'Bar Town',
      },
    ],
  },
  getters: {
    getField,
  },
  mutations: {
    updateField,
  },
});
```

#### Component

```html
<template>
  <div id="app">
    <div v-for="address in addresses">
      <label>ZIP <input v-model="address.zip"></label>
      <label>Town <input v-model="address.town"></label>
    </div>
  </div>
</template>

<script>
import { mapMultiRowFields } from '@/plugins/vuex-fields';

export default {
  computed: {
    ...mapMultiRowFields(['addresses']),
  },
};
</script>
```

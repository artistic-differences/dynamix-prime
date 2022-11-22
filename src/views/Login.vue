<script>
import DynxCenter from "@/components/layout/dynx-center.vue";
import DynxCard from "@/components/layout/dynx-card.vue";
import DynxForm from "@/components/form/dynx-form.vue";

export default {
  components: {DynxForm, DynxCard, DynxCenter}, //these can be loaded dynamically https://medium.com/scrumpy/dynamic-component-templates-with-vue-js-d9236ab183bb
  data: function () {
    return {
      schema: {
        username: {
          type: "text",
          label: "Username"
        },
        password: {
          type: "password",
          label: "Password"
        },
        terms: {
          type: "textarea",
          label: "Terms"
        },
        rememberMe: {
          type: "checkbox",
          placeholder: "Remember Me ?"
        },
      },
      layout: [
        ["username"],
        ["password"],
        ["rememberMe"],
        ["terms"],
      ],
      form: {
        username: '',
        password: '',
        terms: '',
        rememberMe: false,
      }
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      console.log(this.form)
    }
  }
}
</script>

<template>
  <DynxCenter>
    <DynxCard :class="$style['login-card']">
      <DynxForm :schema="schema" :layout="layout" :data="form"
                    :handleSubmit="handleSubmit">
      </DynxForm>
    </DynxCard>
  </DynxCenter>
</template>

<style module>
.login-card {
  width: 600px;
}
</style>
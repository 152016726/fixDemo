<template>
  <component v-bind="linkProps">
      <slot/>
  </component>
</template>

<script>
    import {isExternal} from '@/common/js/util'

    export default {
        props: {
            to: {
                type: String,
                required: true
            }
        },
        methods: {
            linkProps(url) {
                if (isExternal()) {
                    return {
                        is: 'a',
                        href: url,
                        target: '_blank',
                        rel: 'noopener'
                    }
                }
                return {
                    is: 'router-link',
                    to: url
                }
            }
        }
    }
</script>

<style scoped>

</style>

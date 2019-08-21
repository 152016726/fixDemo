<template>
  <div class="menu-wrapper" v-if="!item.hidden">
    <template
      v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" :title="onlyOneChild.meta.title"></item>
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(onlyOneChild.path)" popper-append-to-body>
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta&& item.meta.icon" :title="item.meta.title"/>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      >
      </sidebar-item>
    </el-submenu>
  </div>
</template>

<script>
    import path from 'path';
    import {isExternal} from '@/common/js/util'
    import Item from './item'
    import AppLink from './Link'

    export default {
        name: "SidebarItem",
        components: {
            Item, AppLink
        },
        props: {
            item: {
                type: Object,
                required: true
            },
            isNest: {
                type: Boolean,
                default: false
            },
            basePath: {
                type: String,
                default: ''
            }
        },
        data() {
            // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
            // TODO: refactor with render function
            this.onlyOneChild = null
            return {}
        },
        methods: {
            /**
             * 核定是否路由只有一个需要展示的，如果有多个则返回false,其余情况会赋值给onlyOneChild
             * @param children
             * @param parent
             * @returns {boolean}
             */
            hasOneShowingChild(children = [], parent) {
                const showingChildren = children.filter(item => {
                    if (item.hidden) {
                        return false
                    } else {
                        this.onlyOneChild = item;
                        return true
                    }
                })

                if (showingChildren.length === 1) {
                    return true
                }

                if (showingChildren.length === 0) {
                    this.onlyOneChild = {...parent, path: '', noShowingChildren: true}
                    return true
                }

                return false
            },
            /**
             * 暂时只知道在筛选路由导出路径，具体功能还未知
             * @param routePath
             * @returns {default.props.basePath|{default, type}|*}
             */
            resolvePath(routePath) {
                console.log(routePath, 'routePath');
                if (isExternal(routePath)) {
                    return routePath
                }
                if (isExternal(this.basePath)) {
                    return this.basePath
                }
                console.log(this.basePath, 'this.basePath');
                console.log(path.resolve(this.basePath, routePath), 'path.resolve(this.basePath, routePath)')
                return path.resolve(this.basePath, routePath)
            }
        }
    }
</script>

<style scoped>

</style>

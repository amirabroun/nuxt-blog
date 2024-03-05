<template>
  <VCard
    class="relative pa-3 py-0 mb-3"
    v-for="post in posts"
    :key="post.id"
    style="position: relative"
    :id="`post-${post.id}`"
  >
    <div
      v-if="authUser?.uuid === user?.uuid ?? post.user.uuid"
      class="post-menu"
    >
      <VIcon @click="showSubMenu(post.id)" style="font-size: 40px">
        mdi-settings-helper
      </VIcon>
      <ul class="post-submenu" :id="`post-subMenu-${post.id}`">
        <li @click="changeEditMode(post.id)">
          <button>Edit</button>
        </li>
        <li>
          <button class="delete-post-link" @click="deletePost(post.uuid)">
            Delete
          </button>
        </li>
      </ul>
    </div>
    <div class="main-post-container">
      <VImg
        :src="post.media?.find(() => true)?.original_url"
        class="rounded-lg"
      />
      <VCardTitle class="text-h5">{{ post.title }}</VCardTitle>
      <VCardText>{{ post.body }}</VCardText>
      <VCardSubtitle class="mb-3">
        by
        <NuxtLink
          class="text-info ml-1"
          :to="`/users/${user?.uuid ?? post.user.uuid}`"
        >
          {{ user?.full_name ?? post.user.full_name }}
        </NuxtLink>
        at
        <span class="text-dark ml-1">{{ post.created_at }}</span>
      </VCardSubtitle>
    </div>
    <div class="edit-post-container">
      <VForm>
        <VRow>
          <VCol cols="12">
            <VFileInput
              label="File input"
              accept="image/*"
              ref="file"
            ></VFileInput>
          </VCol>
          <VCol cols="12">
            <VTextField
              :value="post.title"
              ref="title"
              required
              solo
              placeholder="title"
            />
          </VCol>

          <VCol cols="12">
            <VTextarea
              :value="post.body"
              ref="body"
              required
              solo
              placeholder="Write your body"
            />
          </VCol>

          <VCol cols="4">
            <VBtn
              color="red"
              block
              @click="cancelEditMode(post.id)"
              class="formBtn"
            >
              Cancel
            </VBtn>
          </VCol>
          <VCol cols="8">
            <VBtn color="green" block> Edit </VBtn>
          </VCol>
        </VRow>
      </VForm>
    </div>
  </VCard>
</template>

<script setup lang="ts">
import { store } from "~/store";
import { Post } from "~/store/posts";
import { User } from "~/store/user";

const props = defineProps<{
  user?: User | null;
  posts: Post[];
}>();

const posts = props.posts;
const user = props.user;
const authUser = computed(() => store.state.auth?.authUser);

function changeEditMode(id: number | undefined) {
  const element = document.querySelector(`#post-${id}`);
  if (element) element.classList.toggle("edit-mode");
  showSubMenu(id);
}

async function deletePost(postUUID: string) {}

function cancelEditMode(id: number | undefined) {
  const element = document.querySelector(`#post-${id}`);
  if (element) element.classList.remove("edit-mode");
}

function showSubMenu(id: number | undefined) {
  const element = document.querySelector(`#post-subMenu-${id}`);
  if (element) element.classList.toggle("show");
}
</script>

<style>
.post-menu {
  cursor: pointer;
}

.post-submenu {
  list-style-type: none;
  background-color: #fff;
  padding: 1px 10px;
  font-size: 0.95rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s;
}

.post-submenu.show {
  visibility: visible;
  opacity: 1;
}

.post-submenu li {
  margin: 5px 0;
  width: 80px;
}

.delete-post-link {
  color: #0783f1;
}
.delete-post-link {
  color: #eb4d4b;
}

.edit-post-link {
  cursor: pointer;
}

.edit-post-link button {
  pointer-events: none;
}

.edit-mode .main-post-container {
  display: none;
}

.edit-post-container {
  display: none;
}
.edit-mode .edit-post-container {
  display: block;
}
</style>
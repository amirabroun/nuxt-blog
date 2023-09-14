<template>
    <div class="row">
        <div class="col-2"></div>

        <div class="col-sm-12 col-lg-8 p-4">
            <div class="card card-body shadow-sm">
                <table class="table mb-1">
                    <thead>
                        <tr>
                            <th class="border-0 col-4" style="font-size: 13px;">Name</th>
                            <th class="border-0 col-2" style="font-size: 13px;"></th>
                            <th class="border-0 col-6" style="font-size: 13px;">joined at</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td class="col-4 mt-4">
                                <span style="font-size: 14px;">
                                    <NuxtLink class="text-primary" :to="`users/${user.uuid}`">
                                        {{ user.full_name }}
                                    </NuxtLink>
                                    <h6 class="mb-0 text-muted mt-2" style="font-size: 12px;">
                                        {{ user.username }}
                                    </h6>
                                </span>
                            </td>
                            <td class="col-2"></td>
                            <td class="col-6">
                                <span class="text-muted" style="font-size: 12px;">
                                    {{ user.created_at }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="col-2"></div>
    </div>
</template>

<script lang="ts" setup>
import { store } from "~/store";
import { UsersActionTypes } from "~/store/users/action-types";

onMounted(() => {
    store.dispatch(`users/${UsersActionTypes.fetchUsers}`);
});

const users = computed(() => store.state.users?.users);

</script>

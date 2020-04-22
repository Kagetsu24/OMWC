<template>
    <div class="container text-center">
        <page-header-extended>
            <template #title>
                Confirm Teams
            </template>

            <template #subtitle>
                When you set a captain, their team/country will appear here + the members he's or not chosen
            </template>
        </page-header-extended>

        <div class="row">
            <div class="col-sm">
                <div class="card">
                    <data-table
                        v-if="countries"
                        :headers="['Country', 'Captain', 'Chosen', 'Not chosen', '']"
                    >
                        <tr
                            v-for="country in countries"
                            :key="country.id"
                        >
                            <template v-if="country.users">
                                <td>{{ country.name }}</td>
                                <td>{{ country.users.find(u => u.isCaptain) && country.users.find(u => u.isCaptain).username }}</td>
                                <td>
                                    <span
                                        v-for="contestant in country.users.filter(u => u.isContestant)"
                                        :key="contestant.id"
                                    >
                                        {{ contestant.username + ' ' }}
                                    </span>
                                </td>
                                <td>
                                    <span
                                        v-for="user in country.users.filter(u => !u.isContestant && !u.isCaptain)"
                                        :key="user.id"
                                    >
                                        {{ user.username + ' ' }}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        v-if="country.wasConfirmed"
                                        class="btn btn-sm btn-danger"
                                        @click="remove(country.id)"
                                    >
                                        Deny
                                    </button>
                                    <button
                                        v-else
                                        class="btn btn-sm btn-primary"
                                        @click="confirm(country.id)"
                                    >
                                        Confirm
                                    </button>
                                </td>
                            </template>
                        </tr>
                    </data-table>

                    <p v-else>
                        None
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Axios from 'axios';
import PageHeaderExtended from '../../components/PageHeaderExtended.vue';
import DataTable from '../../components/DataTable.vue';

@Component({
    components: {
        PageHeaderExtended,
        DataTable,
    },
})
export default class TeamChoice extends Vue {

    countries = [];

    async created (): Promise<void> {
        await this.getData();
    }

    async getData (): Promise<void> {
        const res = await Axios.get('/api/admin/teamsChoice');
        this.countries = res.data.countries;
    }

    async confirm (countryId: number): Promise<void> {
        const res = await Axios.post('/api/admin/teamsChoice/confirm', {
            countryId,
        });

        if (res.data.error) {
            alert(res.data.error);
        } else {
            await this.getData();
            alert('ok');
        }
    }

    async remove (countryId: number): Promise<void> {
        const res = await Axios.post('/api/admin/teamsChoice/remove', {
            countryId,
        });

        if (res.data.error) {
            alert(res.data.error);
        } else {
            await this.getData();
            alert('ok');
        }
    }

}
</script>
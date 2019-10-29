<template>
  <v-container>
    <v-toolbar color="info">
      <v-row>
        <v-col class="text-left">
          <h2>Posts</h2>
        </v-col>
        <v-col class="text-right">
          <router-link :to="'/create'">
            <v-btn large color="primary">Create</v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-toolbar>
    <center>
      <v-card>
        <v-simple-table fixed-header height="500px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  <h2>Title</h2>
                </th>
                <th class="text-center">
                  <h2>Content</h2>
                </th>
                <th class="text-right">
                  <h2>Action</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in posts" :key="item._id">
                <td class="text-left">{{ item.title }}</td>
                <td class="text-center">{{ item.content }}</td>
                <td class="text-right">
                  <router-link :to="'/update/'+item._id">
                    <v-btn color="primary">Update</v-btn>
                  </router-link>
                  <v-btn color="error" v-on:click="deletei(item._id)">Delete</v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </center>
  </v-container>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      posts: []
    };
  },
  beforeMount() {
    let url = `http://localhost:3000/get-data/all`;
    axios.get(url).then(response => {
      this.posts = response.data;
    });
  },
  methods: {
    deletei(id) {
      let url = `http://localhost:3000/delete/${id}`;
      axios.delete(url).then(response => {
        for (let i = 0; i < this.posts.length; ++i) {
          if (this.posts[i].IDPost == response.data) {
            this.posts.splice(i, 1);
          }
        }
      });
    }
  }
};
</script>
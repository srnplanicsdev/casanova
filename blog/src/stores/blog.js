import api from "@/utils/api";

export default {
    namespaced:true,
  state: {
    blogs: [],
    selectedBlog: null,
    loading: false,
     pagination: {
    current_page: 1,
    last_page: 1,
    total: 0,
    per_page: 10,
  },
  },

  getters: {
    allBlogs: (state) => state.blogs,
    blogById: (state) => state.selectedBlog,
    isLoading: (state) => state.loading,
     pagination: (state) => state.pagination,
  },

  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_BLOGS(state, payload) {
      state.blogs = payload;
    },
    SET_PAGINATION(state, payload) {
    state.pagination = {
      current_page: payload.current_page,
      last_page: payload.last_page,
      total: payload.total,
      per_page: payload.per_page,
    };
  },
    SET_SELECTED_BLOG(state, payload) {
      state.selectedBlog = payload;
    },
    ADD_BLOG(state, payload) {
      state.blogs.unshift(payload);
    },
    UPDATE_BLOG(state, payload) {
      const index = state.blogs.findIndex(b => b.id === payload.id);
      if (index !== -1) state.blogs[index] = payload;
    },
    REMOVE_BLOG(state, id) {
      state.blogs = state.blogs.filter(b => b.id !== id);
    },
    CLEAR_SELECTED_BLOG(state) {
      state.selectedBlog = null;
    }
  },

  actions: {
    async fetchBlogs({ commit }, page = 1) {
      commit("SET_LOADING", true);
      try {
        const res = await api.get(`/blogs?page=${page}`);
        commit("SET_BLOGS", res.data.data);
        commit("SET_PAGINATION", res.data);
      } catch (error) {
        console.error(error);
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async fetchBlogById({ commit }, id) {
      commit("SET_LOADING", true);
      try {
        const res = await api.get(`/blogs/${id}`);
        commit("SET_SELECTED_BLOG", res.data.blog);
        return res.data.blog
      } catch (error) {
        console.error(error);
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async createBlog({ commit }, payload) {
      try {
        const res = await api.post("/blogs", payload,{
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });
        commit("ADD_BLOG", res.data.blog);
      } catch (error) {
        console.error(error);
      }
    },

    async updateBlog({ commit }, { id, payload }) {
      try {
        const res = await api.put(`/blogs/${id}`, payload);
        commit("UPDATE_BLOG", res.data.blog);
      } catch (error) {
        console.error(error);
        console.log(payload)
      }
    },

    async deleteBlog({ commit }, id) {
      try {
        await api.delete(`/blogs/${id}`);
        commit("REMOVE_BLOG", id);
        commit("CLEAR_SELECTED_BLOG");
      } catch (error) {
        console.error(error);
      }
    },

    async logout() {
      try {
        await api.post("/logout");
      } catch (error) {
        console.error(error);
      }
    }
  },
};

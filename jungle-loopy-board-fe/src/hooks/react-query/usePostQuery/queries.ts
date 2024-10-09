
const postQueryKeys = {
  appPosts: () => ['posts'],
  getAllPosts: (id: number) => ['posts', { id }],
  getPost: (id: number) => ['post', { id }],
  createPost: () => ['post'],
  updatePost: (id: number) => ['post', { id }],
  deletePost: (id: number) => ['post', { id }],
}

export default postQueryKeys;
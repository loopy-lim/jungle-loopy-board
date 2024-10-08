
const postQueryKeys = {
  getAllPosts: () => ['posts'],
  getPost: (id: number) => ['post', { id }],
  createPost: () => ['posts'],
  updatePost: (id: number) => ['post', { id }],
  deletePost: (id: number) => ['post', { id }],
}

export default postQueryKeys;
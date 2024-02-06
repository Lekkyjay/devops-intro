import { Router } from 'express'
import { createPost, deletePost, getPost, getPosts, updatePost } from '../controllers/post'

const router = Router()

router.get('/', getPosts)
router.post('/', createPost)
router.get('/:id', getPost)
router.delete('/:id', deletePost)
router.patch('/:id', updatePost)

export default router

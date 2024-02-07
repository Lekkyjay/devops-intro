import { Router } from 'express'
import { createPost, deletePost, getPost, getPosts, updatePost } from '../controllers/post'
import { protect } from '../middlewares/auth'

const router = Router()

router.get('/', getPosts)
router.post('/', protect, createPost)
router.get('/:id', getPost)
router.delete('/:id', protect, deletePost)
router.patch('/:id', protect, updatePost)

export default router

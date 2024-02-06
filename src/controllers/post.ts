import { Request, Response } from 'express'
import { createNewPost, getAllPosts, getPostById, deletePostById } from '../models/Post'

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await getAllPosts()

    return res.status(200).json({
      status: 'success',
      results: posts.length,
      data: { posts }
    })
  }
  catch (error) {
    console.log(error)
    return res.status(400).json({ status: 'fail' })
  }
}

export const getPost = async (req: Request, res: Response) => {
  try {
    const post = await getPostById(req.params.id)

    return res.status(200).json({
      status: 'success',
      data: { post }
    })
  }
  catch (error) {
    console.log(error)
    return res.status(400).json({ status: 'fail' })
  }
}

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, body } = req.body
    if (!title || !body) return res.sendStatus(403)

    const post = await createNewPost(req.body)

    return res.status(200).json({
      status: 'success',
      data: { post }
    })
  }
  catch (error) {
    console.log(error)
    return res.status(400).json({ status: 'fail' })
  }
}

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deletedPost = await deletePostById(id)

    return res.status(200).json({
      status: 'success',
      data: { deletedPost }
    })
  }
  catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params    

    const { title, body } = req.body    

    const post = await getPostById(id)
    if (!post) return res.sendStatus(403)

    post.title = title ? title : post.title
    post.body = body ? body : post.body
    await post.save()

    return res.status(200).json({
      status: 'success',
      data: { post }
    })
  }
  catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

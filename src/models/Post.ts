import { Schema, model, models } from 'mongoose'
import { IPost } from '../utils/types'

const postSchema = new Schema<IPost>(
  {
    title: { type: String, required: [true, 'Post must have title'] },
    body: { type: String, required: [true, 'Post must have body'] },
  },
  { timestamps: true }
)

export const Post = models.Post || model<IPost>('Post', postSchema)

//actions
export const getAllPosts = () => Post.find()
export const getPostById = (id: string) => Post.findById({ _id: id })
export const createNewPost = (post: Record<string, any>) => new Post(post).save().then((post: any) => post.toObject())
export const deletePostById = (id: string) => Post.findOneAndDelete({ _id: id })
export const updatePostById = (id: string, postData: Record<string, any>) => Post.findOneAndUpdate({ id, postData }, { new: true })

// export const getUserByEmail = (email: string) => User.findOne({ email })
// export const getUserBySessionToken = (sessionToken: string) => User.findOne({ 'authentication.sessionToken': sessionToken })

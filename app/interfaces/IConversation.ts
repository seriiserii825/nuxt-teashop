import type { components } from '~/generated/schema'

type ConversationSchema = components['schemas']['ConversationDto']
type ConversationMessageSchema = components['schemas']['ConversationMessageDto']

export type IConversation = ConversationSchema
export type IConversationMessage = ConversationMessageSchema

export default interface Transaction {
  id?: string
  name: string
  date: string | Date
  category: string
  price: number
  whatsapp: number | string
  description: string
  userId: string // Adicionando o ID do dono à interface do frontend.
}

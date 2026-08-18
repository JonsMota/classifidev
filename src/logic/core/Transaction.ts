export default interface Transaction {
  id?: string
  name: string
  date: string | Date
  category: string
  price: number
  whatsapp: number | string
  description: string
}

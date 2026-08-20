export default class Mask {
  /**
   * Formata um valor numérico como moeda brasileira (BRL).
   * Ex: 123456 -> R$ 1.234,56
   */
  static currency(value: string | number): string {
    if (!value) return ''
    const onlyNumbers = String(value).replace(/\D/g, '')
    if (onlyNumbers === '') return ''
    const numberValue = parseFloat(onlyNumbers) / 100
    return numberValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  /**
   * Formata um valor numérico como telefone brasileiro.
   * Ex: 99999999999 -> (99) 99999-9999
   */
  static phone(value: string): string {
    if (!value) return ''
    const onlyNumbers = value.replace(/\D/g, '')
    if (onlyNumbers.length <= 2) return `(${onlyNumbers}`
    if (onlyNumbers.length <= 7) return `(${onlyNumbers.slice(0, 2)}) ${onlyNumbers.slice(2)}`
    return `(${onlyNumbers.slice(0, 2)}) ${onlyNumbers.slice(2, 7)}-${onlyNumbers.slice(7, 11)}`
  }

  /**
   * Remove todos os caracteres não numéricos de uma string.
   * Ex: "R$ 1.234,56" -> "123456"
   */
  static unmask(value: string): string {
    return value.replace(/\D/g, '')
  }
}

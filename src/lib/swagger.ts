import { createSwaggerSpec } from 'next-swagger-doc'

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'src/pages/api', 
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'ClassifiDev API',
        version: '1.0.0',
        description: 'Documentação completa da API'
      }
    }
  })
  return spec
}

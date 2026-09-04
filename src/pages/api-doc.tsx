import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getApiDocs } from '../lib/swagger'
import dynamic from 'next/dynamic'
import 'swagger-ui-react/swagger-ui.css'

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false })

export default function ApiDoc({ spec }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <SwaggerUI spec={spec} />
}

export const getServerSideProps: GetServerSideProps = async () => {
  const spec = await getApiDocs()
  return {
    props: {
      spec
    }
  }
}

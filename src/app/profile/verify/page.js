import dynamic from 'next/dynamic'
import Loader from '../../components/home/loading'


const ClientComponent = dynamic(() => import("../../components/client/verify") , { 
  ssr: false,
  loading: () => <p><Loader /></p>
});
export default ClientComponent;
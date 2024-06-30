import Loader from '../components/home/loading'
import dynamic from 'next/dynamic'


const ClientComponent = dynamic(() => import("../components/client/profile") , { 
  ssr: false,
  loading: () => <p><Loader /></p>
});
export default ClientComponent;
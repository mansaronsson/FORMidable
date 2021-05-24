import { useRouter } from 'next/router';
import QRCode from 'qrcode.react';
import Layout from '../components/layout';
import Link from 'next/link'
import styles from '../styles/Publish.module.css'
import { getSession } from 'next-auth/client';


export default function Publish() {
 
  const router = useRouter();
  const query = router.query.form; 
  const url = `http://localhost:3000/answer?form=${query}`;

  const copyUrlToClipboard = (e) => {
    e.preventDefault();

    const temp = document.createElement('textarea');
    temp.value = url;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);
  }

  return(
    <Layout>
      <div className={styles.mainDiv}>
        <Link href="/">
          <a>← Back to home</a>
        </Link>
        <div className={styles.sharingDiv}>
          <div>
            <QRCode value={url} renderAs='svg' size={200}/>
          </div>
          <div>OR</div>
          <div>
            <button onClick={(e) => copyUrlToClipboard(e)}>
                Copy address
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    };
  }

  return {props: {}};
}
import Image from 'next/image';
import Link from 'next/link';

type Proptype = {
  title: string;
  data: any;
  background: any;
};
const ContactFollow = (props: Proptype) => {
  const { data, title, background } = props;

  const backgroundImage = background?.data?.attributes?.url
    ? `url(${process.env.NEXT_PUBLIC_STRAPI_URL}${background.data.attributes.url})`
    : undefined;

  return (
    <div className='contact-follow' style={{ backgroundImage }}>
      <div className='contact-follow_content'>
        <h2 className='contact-follow_content-title'>{title}</h2>
        <div className='contact-follow_content-socials'>
          {data?.map((item: any) => (
            <Link prefetch={false} key={item.id} href={item.url} passHref target='_blank' rel='noopener'>
              {item.icon.data && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.icon.data.attributes.url}`}
                  width={item.icon.data.attributes.width}
                  height={item.icon.data.attributes.height}
                  alt=''
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactFollow;

import Link from 'next/link';

import { Button } from '@components/button';

export type ContactProps = Single<{
  background: Single<StrapiMedia>;
  preamble: string;
  title: string;
  profile: Single<StrapiMedia>;
  profileText: string;
  buttonContact: StrapiButton;
}>;

const Contact = ({ data }: ContactProps) => {
  if (!data) {
    return null;
  }

  const { background, preamble, title, profile, profileText, buttonContact } = data.attributes;

  const backgroundImage = background.data
    ? `url(${process.env.NEXT_PUBLIC_STRAPI_URL}${background.data.attributes.url})`
    : undefined;

  return (
    <div className='contact' style={{ backgroundImage }}>
      <div className='container'>
        <h2 className='text-preamble contact-preamble'>{preamble}</h2>
        <h2 className='contact-title'>{title}</h2>
        <div className='contact-button'>
          {profile.data && (
            <Link
              prefetch={false}
              href={process.env.NEXT_PUBLIC_SERVER_URL + profile.data.attributes.url}
              target='_blank'
              locale={false}
            >
              <Button>{profileText}</Button>
            </Link>
          )}
          <Link prefetch={false} href={buttonContact?.url || ''}>
            <Button type='primary' size='large' className='btn-border'>
              {buttonContact?.text}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;

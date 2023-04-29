import Script from 'next/script';

export const GTMscript = () => (
	<>
		<Script
			async
			src='https://www.googletagmanager.com/gtag/js?id=G-6RY48EF0EL'
		/>
		<Script id='google-tag-manager' strategy='afterInteractive'>
			{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-6RY48EF0EL');
    `}
		</Script>
	</>
);

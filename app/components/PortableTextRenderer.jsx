import { PortableText } from "@portabletext/react";
import urlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";
import { projectId, dataset } from "~/lib/sanity";
// import SyntaxHighlighter from 'react-syntax-highlighter';
import { Highlight, themes } from "prism-react-renderer"
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useEffect, useState } from "react";


  const CodeComponent = ({value}) => {
    const {code, language} = value

    if(!code || !language) {
        return null
    }

    const [isCopied, copied] = useState(false)

    useEffect(() => {
        if(!isCopied){
            setTimeout(() => {
                copied(false)
            }, 2000)
        }
    }, [isCopied])
    
    return (
        <Highlight
            theme={themes.vsDark}
            code={code}
            language={language}
        >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre style={style} className="relative p-5">
                <CopyToClipboard  onCopy={() => copied(true)} className={`absolute transition-all duration-200 ease-in-out right-2 top-2 ${isCopied ? 'text-green-500' : 'text-red-500'} bg-gray-300 px-1 py-1`} text={code}>
                    <button className="text-red-500">{isCopied ? 'Copied!' : "Copy"}</button>
                </CopyToClipboard>
                {tokens.map((line, i) => (
                <div className="px-4" key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                    ))}
                </div>
                ))}
            </pre>
            )}
        </Highlight>
    )
  }

const builder = urlBuilder({ projectId, dataset });

// Barebones lazy-loaded image component
const SampleImageComponent = ({ value, isInline }) => {
	const { width, height } = getImageDimensions(value);
	return (
		<img
			src={builder
				.image(value)
				.width(isInline ? 100 : 800)
				.fit("max")
				.auto("format")
				.url()}
			alt={value.alt || " "}
			loading="lazy"
			style={{
				// Display alongside text if image appears inside a block text span
				display: isInline ? "inline-block" : "block",

				// Avoid jumping around with aspect-ratio CSS property
				aspectRatio: width / height,
			}}
		/>
	);
};


const components = {
	types: {
		image: SampleImageComponent,
        code: CodeComponent
		// Any other custom types you have in your content
		// Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.
	},
	marks: {
        // Custom renderer for the em / italics decorator
        em: ({children}) => <em>{children}</em>,
        // Custom renderer for the strong / bold decorator
        strong: ({children}) => <strong className="font-semibold">{children}</strong>,
        // Custom renderer for `link` annotation
        link: ({value, children}) => {
            const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
            return (
                <a className="no-underline text-purple-500 bg-gradient-to-r from-red-500 via-blue-400 to-lime-600 bg-[length:0%_2px] bg-no-repeat bg-left-bottom hover:bg-[length:100%_2px] transition-all duration-200" href={value?.href} target={target} rel={target === '_blank' && 'noindex nofollow'}>
                    {children}
                </a>
            )
        },
    },
    block: {
        // Customizing common block types
        h1: ({children}) => <h1 className="text-4xl mb-10 mt-0">{children}</h1>,
        h2: ({children}) => <h2 className="text-3xl mb-10 mt-0">{children}</h2>,
        h3: ({children}) => <h3 className="text-2xl mb-10 mt-0">{children}</h3>,
        h4: ({children}) => <h4 className="text-xl mb-10 mt-0">{children}</h4>,
        blockquote: ({children}) => <blockquote className="border-l-purple-500">{children}</blockquote>,
        normal: ({children}) => <p className="mt-5">{children}</p>,
    },
    list: {
        // Customizing common list types
        bullet: ({children}) => <ul className="mt-10 mb-10">{children}</ul>,
        number: ({children}) => <ol className="mt-lg">{children}</ol>,
    },
    listItem: {
        // Customizing common list types
        bullet: ({children}) => <li style={{listStyleType: 'disclosure-closed'}}>{children}</li>,
        number: ({children}) => <li className="mt-lg">{children}</li>,
    }
    
};

const PortableTextRenderer = ({ body }) => {
	return body ? <PortableText value={body} components={components} /> : null;
};

export default PortableTextRenderer;


const Categories = ({ categories }) => {
    return (
        <ul className="flex gap-2 list-none p-0 m-0 py-2">
            {categories.map( category => {
                return (
                    <li className="text-xs bg-gray-300 px-4 py-2 uppercase">{category.title}</li>
                )
            })}
        </ul>
    )
}
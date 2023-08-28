import { PortableText } from "@portabletext/react";
import urlBuilder from "@sanity/image-url";
import { getImageDimensions } from "@sanity/asset-utils";
import { projectId, dataset } from "~/lib/sanity";
import SyntaxHighlighter from 'react-syntax-highlighter';

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

// const dark = {
//     "code[class*=\"language-\"]": {
//       "color": "white",
//       "background": "none",
//       "textShadow": "0 -.1em .2em black",
//       "fontFamily": "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
//       "fontSize": "1em",
//       "textAlign": "left",
//       "whiteSpace": "pre",
//       "wordSpacing": "normal",
//       "wordBreak": "normal",
//       "wordWrap": "normal",
//       "lineHeight": "1.5",
//       "MozTabSize": "4",
//       "OTabSize": "4",
//       "tabSize": "4",
//       "WebkitHyphens": "none",
//       "MozHyphens": "none",
//       "msHyphens": "none",
//       "hyphens": "none"
//     },
//     "pre[class*=\"language-\"]": {
//       "color": "white",
//       "background": "hsl(30, 20%, 25%)",
//       "textShadow": "0 -.1em .2em black",
//       "fontFamily": "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
//       "fontSize": "1em",
//       "textAlign": "left",
//       "whiteSpace": "pre",
//       "wordSpacing": "normal",
//       "wordBreak": "normal",
//       "wordWrap": "normal",
//       "lineHeight": "1.5",
//       "MozTabSize": "4",
//       "OTabSize": "4",
//       "tabSize": "4",
//       "WebkitHyphens": "none",
//       "MozHyphens": "none",
//       "msHyphens": "none",
//       "hyphens": "none",
//       "padding": "1em",
//       "margin": ".5em 0",
//       "overflow": "auto",
//       "border": ".3em solid hsl(30, 20%, 40%)",
//       "borderRadius": ".5em",
//       "boxShadow": "1px 1px .5em black inset"
//     },
//     ":not(pre) > code[class*=\"language-\"]": {
//       "background": "hsl(30, 20%, 25%)",
//       "padding": ".15em .2em .05em",
//       "borderRadius": ".3em",
//       "border": ".13em solid hsl(30, 20%, 40%)",
//       "boxShadow": "1px 1px .3em -.1em black inset",
//       "whiteSpace": "normal"
//     },
//     "comment": {
//       "color": "hsl(30, 20%, 50%)"
//     },
//     "prolog": {
//       "color": "hsl(30, 20%, 50%)"
//     },
//     "doctype": {
//       "color": "hsl(30, 20%, 50%)"
//     },
//     "cdata": {
//       "color": "hsl(30, 20%, 50%)"
//     },
//     "punctuation": {
//       "Opacity": ".7"
//     },
//     "namespace": {
//       "Opacity": ".7"
//     },
//     "property": {
//       "color": "hsl(350, 40%, 70%)"
//     },
//     "tag": {
//       "color": "hsl(350, 40%, 70%)"
//     },
//     "boolean": {
//       "color": "hsl(350, 40%, 70%)"
//     },
//     "number": {
//       "color": "hsl(350, 40%, 70%)"
//     },
//     "constant": {
//       "color": "hsl(350, 40%, 70%)"
//     },
//     "symbol": {
//       "color": "hsl(350, 40%, 70%)"
//     },
//     "selector": {
//       "color": "hsl(75, 70%, 60%)"
//     },
//     "attr-name": {
//       "color": "hsl(75, 70%, 60%)"
//     },
//     "string": {
//       "color": "hsl(75, 70%, 60%)"
//     },
//     "char": {
//       "color": "hsl(75, 70%, 60%)"
//     },
//     "builtin": {
//       "color": "hsl(75, 70%, 60%)"
//     },
//     "inserted": {
//       "color": "hsl(75, 70%, 60%)"
//     },
//     "operator": {
//       "color": "hsl(40, 90%, 60%)"
//     },
//     "entity": {
//       "color": "hsl(40, 90%, 60%)",
//       "cursor": "help"
//     },
//     "url": {
//       "color": "hsl(40, 90%, 60%)"
//     },
//     ".language-css .token.string": {
//       "color": "hsl(40, 90%, 60%)"
//     },
//     ".style .token.string": {
//       "color": "hsl(40, 90%, 60%)"
//     },
//     "variable": {
//       "color": "hsl(40, 90%, 60%)"
//     },
//     "atrule": {
//       "color": "hsl(350, 40%, 70%)"
//     },
//     "attr-value": {
//       "color": "hsl(350, 40%, 70%)"
//     },
//     "keyword": {
//       "color": "hsl(350, 40%, 70%)"
//     },
//     "regex": {
//       "color": "#e90"
//     },
//     "important": {
//       "color": "#e90",
//       "fontWeight": "bold"
//     },
//     "bold": {
//       "fontWeight": "bold"
//     },
//     "italic": {
//       "fontStyle": "italic"
//     },
//     "deleted": {
//       "color": "red"
//     }
//   };

const CodeComponent =  ({ value }) => {
    const {code, language} = value
    if(!code) {
        return null
    }
    return <SyntaxHighlighter language={language}>{code}</SyntaxHighlighter>
};

const components = {
	types: {
		image: SampleImageComponent,
		// Any other custom types you have in your content
		// Examples: mapLocation, contactForm, code, featuredProjects, latestNews, etc.

        code: CodeComponent
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

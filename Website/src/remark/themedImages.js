import {existsSync} from 'node:fs';
import path from 'node:path';

/** A sibling `image-light.png` supplies the light theme; Markdown stays usable outside the site. */
export default function remarkThemedImages() {
  return (tree, file) => {
    if (!file.path) return;
    function visit(node) {
      if (node.type === 'paragraph' && node.children?.length === 1) {
        const image = node.children[0];
        if (image.type === 'image' && !/^(?:[a-z]+:|\/|#)/i.test(image.url)) {
          const lightUrl = image.url.replace(/(?<!-light)(\.(?:png|gif|jpe?g|webp))$/i, '-light$1');
          if (lightUrl !== image.url && existsSync(path.resolve(path.dirname(file.path), decodeURIComponent(lightUrl)))) {
            // Docusaurus replaces image nodes; put the theme class on a stable wrapper.
            const wrap = (child, theme) => ({
              type: 'mdxJsxTextElement',
              name: 'span',
              attributes: [{type: 'mdxJsxAttribute', name: 'className', value: `theme-image--${theme}`}],
              children: [child],
            });
            node.children = [wrap(image, 'dark'), wrap({...image, url: lightUrl}, 'light')];
          }
        }
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}

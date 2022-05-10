const convertHeader = (data) => {
  return `<h${data.level}>${data.text}</h${data.level}>`;
};

const convertParagraph = (data) => {
  if (data.align) {
    return `<p class="text-${data.align}">${data.text}</p>`;
  }

  return `<p>${data.text}</p>`;
};

const convertList = (data) => {
  const tag = data.style === 'ordered' ? 'ol' : 'ul';

  return `<${tag}>${data.items.map((i) => `<li>${i}</li>`).join('')}</${tag}>`;
};

const convertBlockquote = (data) => {
  return `<blockquote>${data.text}</blockquote>`;
};

const parse = (content) => {
  if (typeof content === 'string') {
    content = JSON.parse(content);
  }

  const output = [];

  content.forEach((item) => {
    if (item.type === 'paragraph') {
      output.push(convertParagraph(item.data));
    } else if (item.type === 'header') {
      output.push(convertHeader(item.data));
    } else if (item.type === 'list') {
      output.push(convertList(item.data));
    } else if (item.type === 'blockquote') {
      output.push(convertBlockquote(item.data));
    }
  });

  return output.join("");
};

export default parse;

export const loadJs = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.type = 'text/javascript'
    document.body.appendChild(script)
    script.onload = () => {
      resolve()
    }
  })
}

export const loadCss = (url) => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    document.head.appendChild(link)
    link.onload = () => {
      resolve()
    }
  })
}

export const generateUUID = () => {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c=='x' ? r : (r&0x7|0x8)).toString(16);
  });
  return uuid;
}

export const generateKeyToTD = (rows) => {
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].columns.length; j++) {
      rows[i].columns[j].key = Math.random().toString(36).slice(-8)
    }
  }

  return rows
}

export const generateKeyToCol = (columns) => {
  for (let i = 0; i < columns.length; i++) {
    columns[i].key = Math.random().toString(36).slice(-8)
  }

  return columns
}

export const splitStyleSheets = (str) => {
  if (!str) {
    return []
  }

  let r = /}\s+./

  let arr = str.split(r).filter(item => item)

  return arr.map(sty => {
    sty = sty.trim()
    if (sty[0] !== '.') {
      sty = '.' + sty
    }
    if (sty[sty.length - 1] !== '}') {
      sty = sty + '}'
    }

    return sty
  })
}

export const splitSheetName = (sheets) => {

  return Array.from(new Set(sheets.map(sheet => {

    let spaceIndex = sheet.indexOf(' ')
    let nameIndex = sheet.indexOf('{')

    let index = nameIndex

    if (spaceIndex > 0 && spaceIndex < nameIndex) {
      index = spaceIndex
    }

    sheet = sheet.substring(1, index)

    return sheet
  })))
}

export const updateStyleSheets = (sheets, head) => {
  console.log(sheets)
  let stylesheets = document.styleSheets[0]

  if (stylesheets.href) {
    let head = document.head || document.getElementsByTagName('head')[0];
    let style = document.createElement('style');
    style.type = 'text/css';
    head.appendChild(style);
    stylesheets =  style.sheet || style.styleSheet;
  }

  let index = 0

  while (stylesheets.cssRules.length > index) {
    if (stylesheets.cssRules[index].selectorText && stylesheets.cssRules[index].selectorText.indexOf(head) === 0) {
      stylesheets.deleteRule(index)
    } else {
      index++
    }
  }

  for (let i = 0; i < sheets.length; i++) {
    console.log(head + sheets[i])

    stylesheets.insertRule(head + sheets[i], 0)
  }
}

export const clearStyleSheets = (head) => {
  let stylesheets = document.styleSheets[0]

  if (stylesheets.href) {
    return false
  }

  let index = 0

  while (stylesheets.cssRules.length > index) {
    if (stylesheets.cssRules[index].selectorText && stylesheets.cssRules[index].selectorText.indexOf(head) === 0) {
      stylesheets.deleteRule(index)
    } else {
      index++
    }
  }
}

export const fixDraggbleList = (list, newIndex) => { // 处理拖拽过程中，列表值和返回的newIndex不一致问题

  const listIndex = list.findIndex(item => !item.key)

  if (listIndex >= 0) {
    list.splice(newIndex, 0, list.splice(listIndex, 1)[0])
  }
}

export const beautifierConf = {
  html: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'separate',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  },
  js: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'normal',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: true,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true
  }
}

// 金额格式化
export const money_format = (number) => {
  return number_format(number, 2, '.', ',');
};

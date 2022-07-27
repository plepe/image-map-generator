const img = document.getElementById('img')
const pos = document.getElementById('pos')

const fileInput = document.getElementById('file')
function updateFile () {
  const [file] = fileInput.files
  if (file) {
    img.src = URL.createObjectURL(file)
  }
}

fileInput.onchange = updateFile
updateFile()

function calcOffset (dom) {
  const result = [ dom.offsetLeft, dom.offsetTop ]

  if (dom.parentNode) {
    const p = calcOffset(dom.parentNode)
    if (p[0] !== undefined) {
      result[0] += p[0]
      result[1] += p[1]
    }
  }

  return result
}

function get_pos (e) {
  const offset = calcOffset(img)

  const x = e.clientX - offset[0]
  const y = e.clientY - offset[1]

  const px = (100 * x / img.offsetWidth).toFixed(2)
  const py = (100 * y / img.offsetHeight).toFixed(2)

  return [px, py]
}

img.ondragstart = (e) => {
  return false
}

img.onmousedown = (e) => {
  const p = get_pos(e)
  pos.value = p[0] + ',' + p[1] + ','
}

img.onmouseup = (e) => {
  const p = get_pos(e)
  pos.value += p[0] + ',' + p[1]
  return false
}

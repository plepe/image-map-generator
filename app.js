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

function get_pos (e) {
  const x = e.clientX - img.offsetLeft
  const y = e.clientY - img.offsetTop

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

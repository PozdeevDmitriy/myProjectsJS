class Options {
     constructor(height = 1, width = 1, bg = 'gray', fontSize = 12, textAlign = 'center') {
         this.height = `height: ${height}px;`;
         this.width = `width: ${width}px;`;
         this.bg = `background-color: ${bg};`;
         this.fontSize = `font-size: ${fontSize}px;`;
         this.textAlign = `text-align: ${textAlign};`;
     }
     newDiv()  {
             let div = document.createElement('div');
             div.textContent = prompt('Введите текст для нового элемента',' ');
             document.body.appendChild(div);
             div.style.cssText = `${this.height}\ ${this.width}\ ${this.bg}\ ${this.fontSize}\ ${this.textAlign}`;
            console.log(div);}
};    
 let myDiv = new Options(100, 100, 'purple');
 myDiv.newDiv();
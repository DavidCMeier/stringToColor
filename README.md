# String To Color

Oh, do you need to assign a color to your user? This is your solution (music on :P)
Just introduce a string and get the color value in Hex (or RGB)

## How to use 🚀

Just install the library (or copy the code if you want)
```
npm install @DavidCMeier/stringToColor
```

and write the magic words: 
```
stringToColor('cool cool cool!')
```

and with this you will get ``#cececf``

# That's all?
No! You can also get the value in RGB! 

```
stringToColor('cool cool cool!', true)
```
returns ``Object {
           red: 206,
           green: 206,
           blue: 207
         }``

In case you need to limit the numbers (if you don't want a #000000 of #FFFFFF) just do the following!
```
stringToColor('cool cool cool!', false, 100, 150)
```
returns ```#6f6f70```

## Contribute 🖇️

Feel free to contribute

## License 📄

This project is under MIT License - look at the file [LICENSE.md](LICENSE.md) for more details.




---
⌨️ with ❤️ [DavidCMeier](https://github.com/DavidCMeier) 😊

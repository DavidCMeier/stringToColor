# String To Color

Ohh need you assign a color to your user? This is your solution (sounds music :P)
Just introduce an String and get the value of the color in Hex (or RGB)
## How to use 🚀

Just install library (or copy the code if you want)
```
npm install @DavidCMeier/stringToColor
```

and write the magic words: 
```
stringToColor('cool cool cool!')
```
and for this you will get ``#cececf``

# That's all?
No! you can get the value in RGB! 
```
stringToColor('cool cool cool!', true)
```
return ``Object {
           red: 206,
           green: 206,
           blue: 207
         }``

And if you need to limit the numbers (if you don't want a #000000 of #FFFFFF) just do it!
```
stringToColor('cool cool cool!', false, 100,150)
```
return ```#6f6f70```

## Contribuit 🖇️

Feel free to contribuit

## License 📄

This project is under MITlicense - look the file [LICENSE.md](LICENSE.md) for more details.




---
⌨️ with ❤️ [DavidCMeier](https://github.com/DavidCMeier) 😊

import connectFonts from 'connect-fonts';
import fontPack from 'connect-fonts-roboto';

export default function (app) {
  app.use(connectFonts.setup({
    fonts: [fontPack]
  }));
}

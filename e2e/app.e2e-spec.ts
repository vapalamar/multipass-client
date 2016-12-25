import { MultipassClientPage } from './app.po';

describe('multipass-client App', function() {
  let page: MultipassClientPage;

  beforeEach(() => {
    page = new MultipassClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

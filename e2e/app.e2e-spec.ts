import { EPortalPage } from './app.po';

describe('e-portal App', () => {
  let page: EPortalPage;

  beforeEach(() => {
    page = new EPortalPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

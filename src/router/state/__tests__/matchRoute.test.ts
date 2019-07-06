import { matchRoute, RoutePath } from '..';

describe('url patterns', () => {
  test.each`
    url                           | path                         | expectedParams
    ${'/'}                        | ${RoutePath.HOME}            | ${{}}
    ${'/newBox'}                  | ${RoutePath.NEW_BOX}         | ${{}}
    ${'/sessionPreview/some-box'} | ${RoutePath.SESSION_PREVIEW} | ${{ boxName: 'some-box' }}
  `(
    '$url should match $path page with params $expectedParams',
    ({
      url,
      path,
      expectedParams,
    }: {
      url: string;
      path: RoutePath;
      expectedParams: { [key: string]: string };
    }) => {
      const params = matchRoute(url, path);
      expect(params).toEqual(expectedParams);
    },
  );
});

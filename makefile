make install:
	npm install

make lint:
	npx eslint .

make link:
	npm link

make jest:
	npx jest

make test-coverage:
	npx jest --coverage

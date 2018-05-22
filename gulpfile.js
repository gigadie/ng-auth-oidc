const gulp = require('gulp');
const concat = require('gulp-concat');
const argv = require('yargs').argv;
const shelljs = require('shelljs');
const del = require('del');
const gulpSequence = require('gulp-sequence');

gulp.task('build', (cb) => {
	const target = argv.t || argv.target || 'dev';
	const buildCmd = (target === 'prod' || target === 'production') ?
		'ng build --prod --aot --build-optimizer --output-hashing=none' :
		'ng build --output-hashing=none';

	const result = shelljs.exec(buildCmd);

	if (result.code) {
		console.log(result.stderr);
		process.exit(1);
	}

	if (target === 'prod' || target === 'production') {
		gulpSequence('prod-concat', 'prod-demo', 'prod-clean', cb)
	}
});

gulp.task('prod-concat', () => {
	return gulp.src([
				'./dist/ng-auth-oidc/runtime.js',
				'./dist/ng-auth-oidc/polyfills.js',
				'./dist/ng-auth-oidc/main.js'
			])
			.pipe(concat('ng-auth-oidc.min.js'))
			.pipe(gulp.dest('./dist/ng-auth-oidc/assets'));
});

gulp.task('prod-clean', () => {
	return del([
			'./dist/ng-auth-oidc/runtime.js',
			'./dist/ng-auth-oidc/polyfills.js',
			'./dist/ng-auth-oidc/main.js',
			'./dist/ng-auth-oidc/styles.js',
			'./dist/ng-auth-oidc/styles.css',
			'./dist/ng-auth-oidc/*.html',
			'./demo/main.html'
		]);
});

gulp.task('prod-demo-html', () => {
	return gulp.src('./dist/ng-auth-oidc/*.html')
				.pipe(gulp.dest('./demo'));
});

gulp.task('prod-demo-config', () => {
	return gulp.src('./src/templates/auth-oidc-config-template.js')
				.pipe(gulp.dest('./demo/assets'));
});

gulp.task('prod-demo-assets', () => {
	return gulp.src('./dist/ng-auth-oidc/assets/**/*')
				.pipe(gulp.dest('./demo/assets'));
});

gulp.task('prod-demo', (cb) => {
	gulpSequence(['prod-demo-html', 'prod-demo-config', 'prod-demo-assets'], cb)
});
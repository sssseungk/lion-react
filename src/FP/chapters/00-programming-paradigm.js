// --------------------------------------------------------------------------
// 📌 [프로그래밍 패러다임]
// --------------------------------------------------------------------------
// - 명령형, 선언형 프로그래밍 비교
// - 함수, 객체 지향 프로그래밍 비교
// --------------------------------------------------------------------------


// --------------------------------------------------------------------------
//! 명령형 프로그래밍

const courses = [
  {
    id: 1,
    name: ' imperative programming',
  },
  {
    id: 2,
    name: 'declarative programming ',
  },
];

// console.log('원본 데이터\n', courses);

// ES2015(v6)
// 전개 구문(Spread Syntax)을 사용하면 배열을 복사할 수 있다.
// 전개 구문은 얕은 복사 방식이라서 안쪽 객체까진 복제하지 못함 => for문 안에서 객체 복제해주기
const updateCourses = [];  // [...courses]

//? 1. 과정 배열을 순환하여 각 과정 이름의 좌우 공백 제거
for (let i = 0, l = courses.length; i < l; i = i + 1) {
  // 객체를 복제할 때 전개구문(spread syntax) 사용하기
  const course = { ...courses[i] };   // 원형 데이터(객체) 복제
  course.name = course.name.trim();
  updateCourses.push(course);    // 빈 배열에 공백제거한 애들을 추가 [{ ... }, { ... }]
}

//? 2. 과정 배열을 순환하여 각 과정 이름 대문자화
for (let i = 0, l = updateCourses.length; i < l; ++i) {
  const course = updateCourses[i];
  course.name = course.name.toUpperCase();
}

// console.log('변형된 데이터\n', updateCourses);
console.assert(!Object.is(courses, updateCourses), '🚨 courses와 updateCourses는 동일한 객체이다.');

//? 3. 배열 원소의 name 속성의 공백을 밑줄로 변경하는 기능 추가 (명령형 프로그래밍 방식식)
for (let i = 0, l = updateCourses.length; i < l; ++i) {
  const course = updateCourses[i];
  course.name = course.name.replace(/\s+/g, '_');
}

// console.log('업데이트 데이터\n', updateCourses);
// console.assert(!Object.is(courses, updateCourses),'🚨 courses와 updateCourses는 동일한 객체이다.');

// --------------------------------------------------------------------------
//! 선언형 프로그래밍

const subjects = [
  {
    id: 1,
    name: ' imperative programming',
  },
  {
    id: 2,
    name: 'declarative programming ',
  },
];

// console.log('원본 데이터\n', subjects);

//? 1. 객체 이름(name) 속성 좌우 공백 제거 함수 선언
function toTrim(object){
  const o = {...object};    // 복제
  o.name = o.name.trim();   // 공백 제거
  return o;  
}

// console.log(toTrim(subjects[0]));
// console.log(toTrim(subjects[1]));

//? 2. 객체 이름(name) 속성 대문자화 함수 선언
function toUpperCase(object) {
  const o = { ...object };
  o.name = o.name.toUpperCase();
  return o;
}

//? 3. 배열 원소의 `name` 속성의 공백을 밑줄(_)로 변경하는 기능 추가
// 선언형 프로그래밍 방식으로
function toUnderscore(object) {
  const o = { ...object };
  o.name = o.name.replace(/\s+/g, '_');
  return o;
}

// console.log(toUpperCase(subjects[0]));
// console.log(toUpperCase(subjects[1]));

//? 4. 과목 이름 "좌우 공백 제거" → "대문자화" 후, 새로운 과목 배열 생성
// ES5의 map()을 사용해야 한다.
// - 조건1. 새로운 배열 반환
// - 조건2. 배열 순환 후, 기능 처리(적용)

/* const updateSubjects = subjects.map(subject => {
  const copySubject = toTrim(subject);   // 공백 제거
  return copySubject;
}).map(subject=> {
  const copySubject = toUpperCase(subject);   // 대문자화
  return copySubject;
}) */

const updateSubjects = subjects
                        .map(toTrim)
                        .map(toUpperCase)
                        .map(toUnderscore);


// console.log('업데이트 데이터\n', updateSubjects);


// --------------------------------------------------------------------------
//! JavaScript 프로그래밍 패러다임
//* 함수(function)를 사용해 구현합니다.
// count, step 기본값(default Options 정의)
function createCountUpButton(container, { count: initialCount = 0, step = 1 } = {}) {
  if (!container || container.nodeType !== document.ELEMENT_NODE) {
    throw new Error('container는 문서의 요소가 아닙니다.');
  }

  let count = initialCount;   // 버튼에 바로 초기값이 설정됨
  
  // 컨테이너가 있으면 버튼 추가
  const countUpButton = document.createElement('button');

	// 화면에 count 렌더링 해주는 함수 
  const render = (newCount) => {
    countUpButton.textContent = String(newCount);
  };

	// count 업데이트 후 새로 변경된 count 값을 render 함수에 위임하는 함수
  const handleCountUp = (e) => {
    count += step;
    render(count);
  };


  countUpButton.setAttribute('type', 'button');
  countUpButton.classList.add('CountUpButton');
  countUpButton.addEventListener('click', handleCountUp);

	// 맨 처음에 0으로 렌더링함
  render(count);
  
  container.append(countUpButton);
}

// const demoContainer = document.getElementById('demo');

// 재사용을 목적으로 하는 컴포넌트 (함수로 구현)
/* 기본 옵션: { count: 0, step: 1, max = 10 } */
// createCountUpButton(demoContainer);
// createCountUpButton(demoContainer, { count: 1 }/* 사용자 정의 옵션 */);
// createCountUpButton(demoContainer, { count: 2 });
// createCountUpButton(demoContainer, { count: 0, step: 6 });   // 버튼 클릭하면 0 > 6이 됨

//! 과제
// - `max` prop을 추가하고, count 값이 max보다 커지면 사용자가 더 이상 버튼을 누를 수 없도록 막는다.
// - `max` prop을 추가하고, count 값이 max보다 커지면 화면의 카운트는 버튼을 눌러도 max 값에 머무른다.




// --------------------------------------------------------------------------
//! JavaScript 프로그래밍 패러다임
//* 클래스(class)를 사용해 구현합니다. (참고: https://mzl.la/3QrTKlF)

// 붕어빵틀(생성자함수: 클래스)
class CountUpButton {
  #config;

  constructor(userOptions) {
    this.#config = { ...CountUpButton.defaultProps, ...userOptions };
    this.init();
  }

  init() {
    console.log(this.#config);
  }

  // static field
  static defaultProps = { 
    count: 0, 
    step: 1, 
  };
  
}


// 새로운(new) 붕어빵(객체: 인스턴스) 생성
const firstCountUp = new CountUpButton({
  step: 3,
});


const demoContainer = document.getElementById('demo');

// demoContainer.append(firstCountUp.render());


// --------------------------------------------------------------------------
// 웹 컴포넌트(Web Components) API
// → 웹 컴포넌트를 사용해 구현합니다. (참고: https://mzl.la/3YjFdu9)


export type Vec2 = {
  x: number;
  y: number;
};

export function hypot2(x: number, y: number) {
  return Math.hypot(x, y);
}

export function rubberBand(x: number, y: number, limit: number): Vec2 {
  const length = Math.hypot(x, y);

  if (length < 0.0001) {
    return { x: 0, y: 0 };
  }

  const scaled = limit * Math.tanh(length / limit);
  const factor = scaled / length;

  return { x: x * factor, y: y * factor };
}

function solveLinearSystem(matrix: number[][], values: number[]) {
  const size = values.length;
  const system = matrix.map((row, index) => [...row, values[index] ?? 0]);

  for (let pivotIndex = 0; pivotIndex < size; pivotIndex += 1) {
    let bestRow = pivotIndex;
    let bestValue = Math.abs(system[pivotIndex]?.[pivotIndex] ?? 0);

    for (let row = pivotIndex + 1; row < size; row += 1) {
      const value = Math.abs(system[row]?.[pivotIndex] ?? 0);

      if (value > bestValue) {
        bestValue = value;
        bestRow = row;
      }
    }

    if (bestValue < 1e-10) {
      return null;
    }

    if (bestRow !== pivotIndex) {
      const current = system[pivotIndex];
      const next = system[bestRow];

      if (current && next) {
        system[pivotIndex] = next;
        system[bestRow] = current;
      }
    }

    const pivotRow = system[pivotIndex];

    if (!pivotRow) {
      return null;
    }

    const pivot = pivotRow[pivotIndex] ?? 0;

    for (let column = pivotIndex; column <= size; column += 1) {
      pivotRow[column] = (pivotRow[column] ?? 0) / pivot;
    }

    for (let row = 0; row < size; row += 1) {
      if (row === pivotIndex) {
        continue;
      }

      const targetRow = system[row];

      if (!targetRow) {
        return null;
      }

      const factor = targetRow[pivotIndex] ?? 0;

      for (let column = pivotIndex; column <= size; column += 1) {
        targetRow[column] = (targetRow[column] ?? 0) - factor * (pivotRow[column] ?? 0);
      }
    }
  }

  return system.map((row) => row[size] ?? 0);
}

function computeHomography(source: number[], destination: number[]) {
  const matrix: number[][] = [];
  const values: number[] = [];

  for (let index = 0; index < 4; index += 1) {
    const x = source[index * 2] ?? 0;
    const y = source[index * 2 + 1] ?? 0;
    const u = destination[index * 2] ?? 0;
    const v = destination[index * 2 + 1] ?? 0;

    matrix.push([x, y, 1, 0, 0, 0, -u * x, -u * y]);
    values.push(u);
    matrix.push([0, 0, 0, x, y, 1, -v * x, -v * y]);
    values.push(v);
  }

  const solution = solveLinearSystem(matrix, values);

  if (!solution) {
    return null;
  }

  return [...solution, 1];
}

export function quadToMatrix3d(
  width: number,
  height: number,
  topLeft: Vec2,
  topRight: Vec2,
  bottomLeft: Vec2,
  bottomRight: Vec2,
) {
  const drift = Math.max(
    hypot2(topLeft.x, topLeft.y),
    hypot2(topRight.x - width, topRight.y),
    hypot2(bottomLeft.x, bottomLeft.y - height),
    hypot2(bottomRight.x - width, bottomRight.y - height),
  );

  if (drift < 0.2) {
    return "none";
  }

  const homography = computeHomography(
    [0, 0, width, 0, 0, height, width, height],
    [
      topLeft.x,
      topLeft.y,
      topRight.x,
      topRight.y,
      bottomLeft.x,
      bottomLeft.y,
      bottomRight.x,
      bottomRight.y,
    ],
  );

  if (!homography) {
    return "none";
  }

  const [
    h00 = 1,
    h01 = 0,
    h02 = 0,
    h10 = 0,
    h11 = 1,
    h12 = 0,
    h20 = 0,
    h21 = 0,
    h22 = 1,
  ] = homography;

  return `matrix3d(${h00},${h10},0,${h20},${h01},${h11},0,${h21},0,0,1,0,${h02},${h12},0,${h22})`;
}

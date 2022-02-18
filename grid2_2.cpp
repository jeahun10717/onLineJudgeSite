#include <stdio.h>

int main() {
	FILE *in, *out;
	in = fopen("grid2.inp", "rt");
	out = fopen("grid2.out", "wt");

	int T, N, M, t, s, k;
	int a = 0, b = 0;
	int cnt = 0;
	int tmp = 0;

	fscanf(in, "%d\n", &T);
	for (int q = 0; q < T; q++) {
		fscanf(in, "%d %d %d %d %d\n", &N, &M, &t, &s, &k);
		switch (s) {
		case 1: a = 0; b = 0; break;
		case 2: a = 0; b = M - 1; break;
		case 3: a = N - 1; b = M - 1; break;
		case 4: a = N - 1; b = 0; break;
		}
		cnt = 0;
		tmp = s;
		for (int i = 1; i < k; i++) {
			if (t == 3) {
				switch (s % 4) {
				case 1: if (b + 1 == M - cnt) {
					s++;
					if (s % 4 + 1 == tmp) cnt++;
					a++;
				}
						else b++;
						break;
				case 2: if (a + 1 == N - cnt) {
					s++;
					if (s % 4 + 1 == tmp) cnt++;
					b--;
				}
						else a++;
						break;
				case 3: if (b - 1 == cnt - 1) {
					s++;
					if (s % 4 + 1 == tmp) cnt++;
					a--;
				}
						else b--;
						break;
				case 0: if (a - 1 == cnt - 1) {
					s++;
					if (s % 4 + 1 == tmp) cnt++;
					b++;
				}
						else a--;
						break;
				}
			}
			else if (t == 4) {
				switch (s % 4) {
				case 1: if (a + 1 == N - cnt) {
					s--;
					if (s < 0) s += 4;
					if (s % 4 == (tmp + 1) % 4) cnt++;
					b++;
				}
						else a++;
						break;
				case 2: if (b - 1 == cnt - 1) {
					s--;
					if (s < 0) s += 4;
					if (s % 4 == (tmp + 1) % 4) cnt++;
					a++;
				}
						else b--;
						break;
				case 3: if (a - 1 == cnt - 1) {
					s--;
					if (s < 0) s += 4;
					if (s % 4 == (tmp + 1) % 4) cnt++;
					b--;
				}
						else a--;
						break;
				case 0: if (b + 1 == M - cnt) {
					s--;
					if (s < 0) s += 4;
					if (s % 4 == (tmp + 1) % 4) cnt++;
					a--;
				}
						else b++;
						break;
				}
			}
		}
		fprintf(out, "%d\n", a*M + b + 1);
	}

	fclose(in);
	fclose(out);

	return 0;
}
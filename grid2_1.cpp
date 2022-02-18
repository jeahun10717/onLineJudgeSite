#include <stdio.h>

int main() {
	FILE *in, *out;
	in = fopen("tmp.inp", "rt");
	out = fopen("tmp.out", "wt");

	int T, N, M, t, s, k;
	int a = 0, b = 0;
	int cnt = 0;
	int tmp = 0;
	int i = 0;

	fscanf(in, "%d\n", &T);
	for (int q = 0; q < T; q++) {
		fscanf(in, "%d %d %d %d %d\n", &N, &M, &t, &s, &k);
		cnt = 2 * N + 2 * M - 4;
		for (i = 0 ; ; cnt -= 8, i++) {
			if(k > cnt) {
				k -= cnt;
			}
			else break;
		}
		s--;
		switch (s) {
		case 0: a = i; b = i; break;
		case 1: a = i; b = M - 1 - i; break;
		case 2: a = N - 1 - i; b = M - 1 - i; break;
		case 3: a = N - 1 - i; b = i; break;
		}
		cnt = i;
		tmp = s;
		for (int p = 1 ; p < k ; p++) {
			switch(t) {
				case 3:
				switch(s) {
					case 0:
					if(b + 1 < M - cnt) b++;
					else {
						s = (s+1)%4;
						a++;
					}
					break;
					case 1:
					if(a + 1 < N - cnt) a++;
					else {
						s = (s+1)%4;
						b--;
					}
					break;
					case 2:
					if(b > cnt) b--;
					else {
						s = (s+1)%4;
						a--;
					}
					break;
					case 3:
					if(a > cnt) a--;
					else {
						s = (s+1)%4;
						b++;
					}
                    break;
				}
				break;
				case 4:
				switch(s) {
					case 0:
					if(a + 1 < N - cnt) a++;
					else {
						s = (s+3)%4;
						b++;
					}
					break;
					case 1:
					if(b > cnt) b--;
					else {
						s = (s+3)%4;
						a++;
					}
					break;
					case 2:
					if(a > cnt) a--;
					else {
						s = (s+3)%4;
						b--;
					}
					break;
					case 3:
					if(b + 1 < M - cnt) b++;
					else {
						s = (s+3)%4;
						a--;
					}
					break;
				}
				break;
			}

		}

		fprintf(out, "%d\n", a*M + b + 1);
	}

	fclose(in);
	fclose(out);

	return 0;
}